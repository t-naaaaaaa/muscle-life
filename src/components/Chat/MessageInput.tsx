"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import type { MessageInputProps } from "@/types/chat";

const MAX_CHARS = 30;

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "メッセージを入力...",
}) => {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    const length = message.length;
    setCharCount(length);
    setIsOverLimit(length > MAX_CHARS);
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length <= MAX_CHARS) {
      setMessage(input);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isOverLimit) {
      await onSendMessage(message);
      setMessage("");
      setCharCount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={handleChange}
              placeholder={`${placeholder} (${MAX_CHARS}文字まで)`}
              disabled={disabled}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 
                ${
                  isOverLimit
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-red-600"
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <div
              className={`absolute right-2 top-2 text-sm 
              ${isOverLimit ? "text-red-500" : "text-gray-500"}`}
            >
              {charCount}/{MAX_CHARS}
            </div>
          </div>
          <button
            type="submit"
            disabled={disabled || !message.trim() || isOverLimit}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors 
              disabled:opacity-50 disabled:cursor-not-allowed"
            title={isOverLimit ? "メッセージが制限を超えています" : undefined}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {isOverLimit && (
          <p className="text-red-500 text-sm">
            メッセージは{MAX_CHARS}文字以内で入力してください
          </p>
        )}
      </div>
    </form>
  );
};
