//src/components/Chat/ChatTabs.tsx

"use client";

import React from "react";
import type { ChatTabProps } from "@/types/chat";

export const ChatTabs: React.FC<ChatTabProps> = ({
  activeMode,
  onModeChange,
}) => {
  return (
    <div className="flex border-b border-gray-200">
      <button
        className={`flex-1 py-2 px-4 text-sm font-medium ${
          activeMode === "motivational"
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500 hover:text-red-500"
        }`}
        onClick={() => onModeChange("motivational")}
      >
        筋トレモード
      </button>
      <button
        className={`flex-1 py-2 px-4 text-sm font-medium ${
          activeMode === "ai"
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500 hover:text-red-500"
        }`}
        onClick={() => onModeChange("ai")}
      >
        AIモード
      </button>
    </div>
  );
};
