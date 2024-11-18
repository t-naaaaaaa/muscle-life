"use client";

import React, { useState, useCallback } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatTabs } from "./ChatTabs";
import { MessageCircle, X } from "lucide-react";
import { getRandomMessage } from "@/config/messages";
import type { Message, ChatComponent, ChatMode } from "@/types/chat";

export const Chat: ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMode, setChatMode] = useState<ChatMode>("motivational");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = useCallback(
    (text: string) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text:
            chatMode === "motivational"
              ? getRandomMessage()
              : "申し訳ありません。AIモードは現在開発中です。もう少々お待ちください。",
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
    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 背景オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 xl:hidden z-40"
          onClick={toggleChat}
        />
      )}

      {/* メインのチャットウィンドウ */}
      <div
        className={`
          fixed
          xl:bottom-4 xl:right-4
          xl:w-96 xl:h-[500px]
          xl:translate-y-0
          
          // モバイル・タブレット用のスタイル
          ${
            isOpen
              ? "bottom-0 right-0 w-full h-[80vh] translate-y-0"
              : "translate-y-full"
          }
          xl:translate-y-0
          
          transition-transform duration-300 ease-in-out
          bg-white
          xl:rounded-lg
          shadow-xl
          flex flex-col
          overflow-hidden
          z-50
        `}
        role="complementary"
        aria-label="Muscle Chat Interface"
      >
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-xl">Muscle Chat</h2>
            <p className="text-white/90 text-sm font-medium mt-1">
              限界を超えろ。最強の自分を作り出せ。
            </p>
          </div>
          <button
            onClick={toggleChat}
            className="xl:hidden text-white/90 hover:text-white p-1"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
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

      {/* チャット起動ボタン */}
      <button
        onClick={toggleChat}
        className={`
          fixed bottom-4 right-4
          xl:hidden
          w-14 h-14
          bg-gradient-to-r from-red-600 to-orange-600
          rounded-full
          flex items-center justify-center
          text-white
          shadow-lg
          transition-all duration-300
          z-50
          ${isOpen ? "scale-0" : "scale-100"}
        `}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
};

export default Chat;
