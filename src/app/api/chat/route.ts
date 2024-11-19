// src/app/api/chat/route.ts

import { errorMessages } from "@/config/errors";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
      },
      body: JSON.stringify({
        model: "claude-2",
        prompt: messages.map((msg: any) => msg.content).join("\n"),
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return new Response(
          JSON.stringify({ error: errorMessages.tokenExhausted }),
          {
            status: response.status,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
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
