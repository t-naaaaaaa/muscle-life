"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import type { MessageInputProps } from "@/types/chat";

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
