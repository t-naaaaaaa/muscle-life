import React from "react";
import type { MessageDisplayProps } from "@/types/calendar";

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => (
  <div className="bg-black/80 rounded-lg p-8 mb-6">
    <p className="text-5xl font-bold text-white text-center tracking-wider leading-tight">
      {message}
    </p>
  </div>
);
