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
  const [messages, setMessages] = useState<Message[]>([]); // iamessages から messages に変更

  const [chatMode, setChatMode] = useState<ChatMode>("motivational");
  const [isOpen, setIsOpen] = useState(false);

  // システムメッセージの送信
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        text:
          chatMode === "motivational"
            ? "筋肉が全て解決する！メッセージを送って筋肉を鍛えよう！"
            : "筋肉が全て解決する！メッセージを送って筋肉を鍛えよう！",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, [chatMode, messages.length]);

  // 以下は同じコードが続くので省略...
  const getBotResponse = useCallback(
    (userMessage: string) => {
      if (chatMode === "motivational") {
        return new Promise<string>((resolve) => {
          setTimeout(() => {
            const response = getRandomMessage();
            resolve(response);
          }, 1000);
        });
      } else {
        return new Promise<string>(async (resolve) => {
          try {
            const response = await ChatResponseGenerator.generateAIResponse(
              userMessage
            );
            resolve(response);
          } catch (error) {
            console.error("Error generating AI response:", error);
            resolve("マインドとフィジカルは全てを凌駕します。");
          }
        });
      }
    },
    [chatMode]
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      // タイピングインジケータメッセージ
      const typingMessage: Message = {
        id: "typing",
        text: "入力中...",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, typingMessage]);

      try {
        const response = await getBotResponse(text);

        // タイピングメッセージを削除して実際の応答を追加
        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== "typing")
            .concat({
              id: (Date.now() + 1).toString(),
              text: response,
              sender: "bot",
              timestamp: new Date(),
            })
        );
      } catch (error) {
        console.error("Error getting bot response:", error);
        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== "typing")
            .concat({
              id: (Date.now() + 1).toString(),
              text: "システムの筋力が一時的に低下しています。超回復のため少々お待ちください。",
              sender: "bot",
              timestamp: new Date(),
            })
        );
      }
    },
    [getBotResponse]
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
