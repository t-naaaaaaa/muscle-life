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
      throw new Error("API key is not configured");
    }

    const { messages } = await req.json();

    // 入力文字数制限チェック
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.sender === "user" && lastUserMessage.text.length > 30) {
      return new Response(
        JSON.stringify({
          error: "Message too long",
          details: "Please limit your message to 30 characters",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("📨 Chat API: 受信メッセージ:", messages);

    let prompt = aiPrompts.systemPrompt;
    const formattedMessages = messages
      .map((msg: any) => {
        const role = msg.sender === "user" ? "Human" : "Assistant";
        return `\n\n${role}: ${msg.text.trim()}`;
      })
      .join("");

    prompt += formattedMessages + "\n\nAssistant:";

    let lastError;
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.ANTHROPIC_API_KEY!,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            prompt,
            model: "claude-2.1",
            max_tokens_to_sample: 50, // トークン数削減
            stream: false,
            stop_sequences: ["\n\nHuman:", "。", "！", "？"],
            temperature: 0.1, // より決定論的な応答に
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`❌ Chat API: 試行 ${i + 1} 失敗:`, errorData);

          if (errorData.error?.type === "overloaded_error") {
            lastError = errorData;
            await delay(RETRY_DELAY * (i + 1));
            continue;
          }

          throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        return new Response(JSON.stringify({ completion: data.completion }), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
          },
        });
      } catch (error) {
        lastError = error;
        if (i < MAX_RETRIES - 1) {
          await delay(RETRY_DELAY * (i + 1));
          continue;
        }
      }
    }

    console.error("❌ Chat API: すべてのリトライが失敗");
    return new Response(
      JSON.stringify({
        error: errorMessages.overloaded,
        details:
          lastError instanceof Error ? lastError.message : "Unknown error",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
