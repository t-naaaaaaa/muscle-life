//src/components/Chat/MessageList.tsx

"use client";

import React from "react";
import type { MessageListProps } from "@/types/chat";

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-red-600 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
