// src/app/api/chat/route.ts

import { errorMessages } from "@/config/errors";
import { aiPrompts } from "@/config/prompts";

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: errorMessages.serverError }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = await req.json();

    // システムプロンプトを取得し、必要に応じて改行を追加
    let prompt = aiPrompts.systemPrompt.trim();
    if (prompt && !prompt.endsWith("\n\n")) {
      prompt += "\n\n";
    }

    // プロンプトが "\n\nHuman:" で始まるようにメッセージを追加
    const formattedMessages = messages
      .map((msg: any) => {
        const role = msg.sender === "user" ? "Human" : "Assistant";
        return `\n\n${role}: ${msg.text.trim()}`;
      })
      .join("");

    // プロンプトを構築
    prompt += formattedMessages;
    prompt += "\n\nAssistant:"; // アシスタントの応答の開始

    const response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        prompt,
        model: "claude-2",
        max_tokens_to_sample: 1000,
        stream: true,
        stop_sequences: ["\n\nHuman:"],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error details:", errorText);
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    return new Response(response.body, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return new Response(JSON.stringify({ error: errorMessages.serverError }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
