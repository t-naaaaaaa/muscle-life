//src/types/calendar.ts

import type { FC } from "react";

export type CalendarMessage = {
  id: number;
  text: string;
  imageId: number;
};

export type Background = {
  id: number;
  className: string;
};

export type MotivationalImage = {
  id: number;
  url: string;
  alt: string;
  category: string;
};

export type DateHeaderProps = {
  currentDate: Date;
  onDateChange: (date: Date) => void;
};

export type MessageDisplayProps = {
  message: string;
};

export type MotivationalImageProps = {
  imageId: number;
};

export type PositiveCalendarProps = Record<string, never>;

export type PositiveCalendarComponent = FC<PositiveCalendarProps>;
