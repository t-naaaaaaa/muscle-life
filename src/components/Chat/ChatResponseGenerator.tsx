// src/components/Chat/ChatResponseGenerator.tsx

import { Message } from "@/types/chat";

export class ChatResponseGenerator {
  static async generateAIResponse(
    messages: Message[],
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
      console.log("📝 ChatResponseGenerator: レスポンスデータ:", data);

      if (!response.ok) {
        console.error("❌ ChatResponseGenerator: HTTPエラー", response.status);
        throw new Error(data.error || "Unknown error");
      }

      if (data.error) {
        console.error("❌ ChatResponseGenerator: エラーレスポンス", data.error);
        throw new Error(data.error);
      }

      if (!data.completion) {
        console.error("❌ ChatResponseGenerator: 不正なレスポンス形式");
        throw new Error("Invalid response format");
      }

      return data.completion;
    } catch (error) {
      console.error("❌ ChatResponseGenerator: エラー発生", error);
      throw error;
    }
  }
};
