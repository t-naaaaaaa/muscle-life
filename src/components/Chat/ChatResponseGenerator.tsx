// src/components/Chat/ChatResponseGenerator.tsx

import { Message } from "@/types/chat";
import { errorMessages } from "@/config/errors";

export class ChatResponseGenerator {
  static async generateAIResponse(
    messages: Message[],
    onChunkReceived?: (chunk: string) => void
  ): Promise<string> {
    console.log("🤖 ChatResponseGenerator: リクエスト開始", messages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            sender: msg.sender,
            text: msg.text,
          })),
        }),
      });

      const data = await response.json();

      // エラーレスポンスの処理
      if (data.error) {
        console.error("❌ ChatResponseGenerator: エラーレスポンス", data.error);
        throw new Error(data.error);
      }

      // 通常のレスポンス処理
      if (data.completion) {
        console.log(
          "✅ ChatResponseGenerator: 正常レスポンス",
          data.completion
        );
        if (onChunkReceived) {
          onChunkReceived(data.completion);
        }
        return data.completion;
      }

      throw new Error(errorMessages.unknownError);
    } catch (error) {
      console.error("❌ ChatResponseGenerator: エラー発生", error);
      throw error;
    }
  }
}
