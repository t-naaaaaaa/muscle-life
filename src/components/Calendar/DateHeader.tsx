"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateHeaderProps } from "@/types/calendar";

export const DateHeader: React.FC<DateHeaderProps> = ({
  currentDate,
  onDateChange,
}) => {
  const formattedDate = currentDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    onDateChange(newDate);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    if (!isNaN(newDate.getTime())) {
      onDateChange(newDate);
    }
  };

  return (
    <div className="p-3 border-b border-white/20">
      <div className="flex items-center justify-between text-white">
        <button
          onClick={handlePrevDay}
          className="p-1 hover:bg-black/20 rounded-full transition-colors text-lg"
          aria-label="Previous day"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <label className="relative group">
            <span className="cursor-pointer text-base font-medium">
              {formattedDate}
            </span>
            <input
              type="date"
              value={currentDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Select date"
            />
          </label>
        </div>

        <button
          onClick={handleNextDay}
          className="p-1 hover:bg-black/20 rounded-full transition-colors text-lg"
          aria-label="Next day"
        >
          →
        </button>
      </div>
    </div>
  );
};
