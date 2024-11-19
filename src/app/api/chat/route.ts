// src/app/api/chat/route.ts

import { errorMessages } from "@/config/errors";
import { aiPrompts } from "@/config/prompts";

// レート制限の設定
const RATE_LIMIT_WINDOW = 60 * 1000; // 1分
const REQUESTS_PER_WINDOW = 40; // 余裕を持って設定
let requestCount = 0;
let windowStart = Date.now();

// リトライの設定
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// レート制限チェック
const checkRateLimit = () => {
  const now = Date.now();
  if (now - windowStart > RATE_LIMIT_WINDOW) {
    requestCount = 0;
    windowStart = now;
  }
  if (requestCount >= REQUESTS_PER_WINDOW) {
    return false;
  }
  requestCount++;
  return true;
};

export async function POST(req: Request) {
  console.log("🚀 Chat API: リクエスト受信");

  try {
    // レート制限チェック
    if (!checkRateLimit()) {
      return new Response(
        JSON.stringify({
          error: errorMessages.overloaded,
          details: "Rate limit exceeded",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": `${Math.ceil(
              (RATE_LIMIT_WINDOW - (Date.now() - windowStart)) / 1000
            )}`,
          },
        }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.log("❌ Chat API: API key未設定");
      throw new Error("API key is not configured");
    }

    const { messages } = await req.json();
    console.log("📨 Chat API: 受信メッセージ:", messages);

    try {
      let response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          system: aiPrompts.systemPrompt,
          messages: messages.map((msg: any) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          max_tokens: 150, // トークン数を増やす
          temperature: 0.1,
        }),
      });

      console.log("📝 Chat API: APIレスポンス状態:", response.status);
      const data = await response.json();
      console.log("📝 Chat API: APIレスポンスデータ:", data);

      if (!response.ok) {
        throw new Error(data.error?.message || "API request failed");
      }

      // content配列の最初のテキストを取得
      const messageText =
        data.content[0]?.text || "応答を生成できませんでした。";

      return new Response(
        JSON.stringify({
          completion: messageText,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
          },
        }
      );
    } catch (error) {
      console.error("❌ Chat API: API呼び出しエラー:", error);
      throw error;
    }
  } catch (error) {
    console.error("💥 Chat API: 重大エラー:", error);
    return new Response(
      JSON.stringify({
        error: errorMessages.serverError,
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
