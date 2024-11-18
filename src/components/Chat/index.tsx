"use client";

import React, { useState } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { getRandomMessage } from "@/config/messages";
import type { Message, ChatComponent } from "@/types/chat";

export const Chat: ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // ボットの応答を追加
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomMessage(),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div
      className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
      role="complementary"
      aria-label="Muscle Chat Interface"
    >
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
        <h2 className="text-white font-bold text-xl">Muscle Chat</h2>
        <p className="text-white/90 text-sm font-medium mt-1">
          限界を超えろ。最強の自分を作り出せ。
        </p>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

// 型チェックのためにdefault exportを追加
export default Chat;
