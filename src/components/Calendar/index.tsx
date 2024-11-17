"use client";

import React, { useState, useEffect, useCallback } from "react";
import { messages, backgrounds } from "@/config/calendar";
import { DateHeader } from "./DateHeader";
import { MessageDisplay } from "./MessageDisplay";
import { MotivationalImage } from "./MotivationalImage";
import type { PositiveCalendarComponent } from "@/types/calendar";

const PositiveCalendar: PositiveCalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [message, setMessage] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [imageId, setImageId] = useState<number>(1);

  const updateDailyContent = useCallback(() => {
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const daysSinceStart = Math.floor(
      (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
    );
    const messageIndex = daysSinceStart % messages.length;
    const bgIndex = Math.floor(daysSinceStart / 7) % backgrounds.length;

    try {
      const selectedMessage = messages[messageIndex];
      setMessage(selectedMessage.text);
      setImageId(selectedMessage.imageId);
      setBackground(backgrounds[bgIndex].className);
    } catch (error) {
      console.error("Error updating daily content:", error);
      setMessage(messages[0].text);
      setImageId(messages[0].imageId);
      setBackground(backgrounds[0].className);
    }
  }, [currentDate]);

  useEffect(() => {
    updateDailyContent();

    const timer = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, [currentDate, updateDailyContent]);

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <div
        className={`w-[500px] rounded-2xl shadow-xl transition-colors duration-300 overflow-hidden ${background}`}
        role="main"
        aria-label="Daily motivation calendar"
      >
        <DateHeader currentDate={currentDate} onDateChange={handleDateChange} />
        <div className="p-4 flex flex-col gap-4">
          <MessageDisplay message={message} />
          <div className="aspect-square w-full">
            <MotivationalImage imageId={imageId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositiveCalendar;
