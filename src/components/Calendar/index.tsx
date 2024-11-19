// src/components/Calendar/index.tsx

"use client";

import React, { useState, useEffect } from "react";
import { DateHeader } from "./DateHeader";
import { MessageDisplay } from "./MessageDisplay";
import { MotivationalImage } from "./MotivationalImage";
import {  backgrounds } from "@/config/calendar";
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
          xmlns="/public/images/LINE_APP_Android.png"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.95 15.46C16.76 15.76 16.44 15.94 16.09 15.94C15.74 15.94 15.42 15.76 15.23 15.46L14.06 13.62L11.94 13.62L10.77 15.46C10.58 15.76 10.26 15.94 9.91 15.94C9.56 15.94 9.24 15.76 9.05 15.46L7.05 12.31C6.86 12.01 6.86 11.63 7.05 11.33L9.05 8.18C9.24 7.88 9.56 7.7 9.91 7.7C10.26 7.7 10.58 7.88 10.77 8.18L11.94 10.02L14.06 10.02L15.23 8.18C15.42 7.88 15.74 7.7 16.09 7.7C16.44 7.7 16.76 7.88 16.95 8.18L18.95 11.33C19.14 11.63 19.14 12.01 18.95 12.31L16.95 15.46Z" />
        </svg>
      </a>
    </div>
  </div>
);
};

export default PositiveCalendar;
