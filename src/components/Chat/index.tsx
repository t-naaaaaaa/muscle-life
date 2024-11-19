// src/components/Chat/index.tsx

"use client";

import React, { useState, useCallback, useEffect } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatTabs } from "./ChatTabs";
import { MessageCircle, X } from "lucide-react";
import { getRandomMessage } from "@/config/messages";
import type { Message, ChatComponent, ChatMode } from "@/types/chat";
import { ChatResponseGenerator } from "./ChatResponseGenerator";

export const Chat: ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("motivational");
  const [isOpen, setIsOpen] = useState(false);

  // システムメッセージの送信
  useEffect(() => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: "筋肉が全て解決する！メッセージを送って筋肉を鍛えよう！",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [chatMode]);

  const handleMotivationalMessage = useCallback(() => {
    console.log("💪 筋トレモード: ランダムメッセージを生成");
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        // messages.tsからランダムなメッセージを取得
        const randomMessage = getRandomMessage();
        console.log("📝 選択されたメッセージ:", randomMessage);
        resolve(randomMessage);
      }, 1000);
    });
  }, []);

  const handleAIMessage = useCallback(
    async (
      allMessages: Message[],
      onChunkReceived?: (chunk: string) => void
    ) => {
      console.log("🤖 AIモード: メッセージ生成開始");
      try {
        const response = await ChatResponseGenerator.generateAIResponse(
          allMessages,
          onChunkReceived
        );
        return response;
      } catch (error) {
        console.error("❌ AIモード: エラー発生", error);
        throw error;
      }
    },
    []
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setIsLoading(true);
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      // タイピングインジケーター用のメッセージ
      const typingMessageId = `typing-${Date.now()}`;
      const typingMessage: Message = {
        id: typingMessageId,
        text: "・・・", // タイピングインジケーター
        sender: "bot",
        timestamp: new Date(),
        isTyping: true, // タイピング状態を示すフラグ
      };

      setMessages((prev) => [...prev, typingMessage]);

      try {
        if (chatMode === "motivational") {
          const response = await handleMotivationalMessage();
          setMessages((prev) =>
            prev
              .filter((msg) => msg.id !== typingMessageId)
              .concat({
                id: Date.now().toString(),
                text: response,
                sender: "bot",
                timestamp: new Date(),
              })
          );
        } else {
          const response = await handleAIMessage([...messages, newMessage]);
          setMessages((prev) =>
            prev
              .filter((msg) => msg.id !== typingMessageId)
              .concat({
                id: Date.now().toString(),
                text: response,
                sender: "bot",
                timestamp: new Date(),
              })
          );
        }
      } catch (error) {
        console.error("メッセージ送信エラー:", error);
        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== typingMessageId)
            .concat({
              id: Date.now().toString(),
              text:
                error instanceof Error
                  ? error.message
                  : "エラーが発生しました。もう一度お試しください。",
              sender: "bot",
              timestamp: new Date(),
              isError: true, // エラー状態を示すフラグ
            })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [chatMode, isLoading, messages, handleMotivationalMessage, handleAIMessage]
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
          
          ${
            isOpen
              ? "bottom-0 right-0 w-full h-[80vh] translate-y-0"
              : "bottom-0 right-0 w-full h-[80vh] translate-y-full"
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
            disabled={isLoading}
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
