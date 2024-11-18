"use client";

import React, { useState, useCallback } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatTabs } from "./ChatTabs";
import { getRandomMessage } from "@/config/messages";
import type { Message, ChatComponent, ChatMode } from "@/types/chat";

export const Chat: ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMode, setChatMode] = useState<ChatMode>("motivational");

  const handleSendMessage = useCallback(
    (text: string) => {
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
          text:
            chatMode === "motivational"
              ? getRandomMessage()
              : "申し訳ありません。AIモードは現在開発中です。もう少々お待ちください。", // AIモードの応答
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    },
    [chatMode]
  );

  const handleModeChange = (mode: ChatMode) => {
    setChatMode(mode);
    setMessages([]); // モード切替時にメッセージをクリア
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
      <ChatTabs activeMode={chatMode} onModeChange={handleModeChange} />
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} />
        <MessageInput
          onSendMessage={handleSendMessage}
          placeholder={
            chatMode === "motivational"
              ? "メッセージを入力..."
              : "AIに質問する..."
          }
        />
      </div>
    </div>
  );
};

export default Chat;
