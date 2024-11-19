// src/components/ChatResponseGenerator.tsx

import { errorMessages } from "@/config/errors";
export class ChatResponseGenerator {
  static async generateAIResponse(userMessage: string): Promise<string> {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorMessages.unknownError);
      }

      if (!response.body) {
        throw new Error("ストリームが利用できません");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        // ここでリアルタイムに result を更新して表示できます
      }

      return result;
    } catch (error) {
      console.error("AI Response Error:", error);
      return error instanceof Error
        ? error.message
        : errorMessages.unknownError;
    }
  }
}
