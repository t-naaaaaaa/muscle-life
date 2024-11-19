// src/components/Calendar/index.tsx

"use client";

import React, { useState, useEffect } from "react";
import { DateHeader } from "./DateHeader";
import { MessageDisplay } from "./MessageDisplay";
import { MotivationalImage } from "./MotivationalImage";
import { backgrounds } from "@/config/calendar";
import { botMessages } from "@/config/messages"; // botMessagesをインポート
import type {
  PositiveCalendarComponent,
  CalendarMessage,
  Background,
} from "@/types/calendar";

const PositiveCalendar: PositiveCalendarComponent = () => {
  const [currentMessage, setCurrentMessage] = useState<CalendarMessage | null>(
    null
  );
  const [currentBackground, setCurrentBackground] = useState<Background | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    // 日付から1年の通算日を計算（0から364）
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diff = currentDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // 100日で1周するように調整（0から99の値を取得）
    const messageIndex = dayOfYear % 100;

    // メッセージを設定（botMessagesから取得）
    const todaysMessage: CalendarMessage = {
      id: messageIndex + 1,
      text: botMessages[messageIndex].text,
      imageId: (messageIndex % 7) + 1, // 画像は7枚を循環
    };

    // 背景もパターン化（例：5日で1周）
    const backgroundIndex = dayOfYear % backgrounds.length;

    setCurrentMessage(todaysMessage);
    setCurrentBackground(backgrounds[backgroundIndex]);
  }, [currentDate]); // currentDateが変更されたときに再計算

  if (!currentMessage || !currentBackground) {
    return null;
  }

  // ソーシャルメディアのリンク
  const socialLinks = {
    twitter: "https://twitter.com/kyo_tomap", // 実際のXアカウントURLに変更
    line: "https://line.me/R/ti/p/@933lxkde", // 実際のLINE URLに変更
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${currentBackground.className}`}
    >
      <div className="w-full max-w-lg">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden">
          <DateHeader currentDate={currentDate} onDateChange={setCurrentDate} />
          <div className="p-6 space-y-6">
            <MessageDisplay message={currentMessage.text} />
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <MotivationalImage imageId={currentMessage.imageId} />
            </div>
          </div>
        </div>
      </div>

      {/* ソーシャルメディアボタン */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-2">
        {/* Xボタン */}
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
          aria-label="X (Twitter) Account"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LINEボタン */}
        <a
          href={socialLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#00B900] hover:bg-[#009900] rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
          aria-label="LINE Account"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.001 12 .001S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PositiveCalendar;
