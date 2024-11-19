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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${currentBackground.className}`}
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
    </div>
  );
};

export default PositiveCalendar;
