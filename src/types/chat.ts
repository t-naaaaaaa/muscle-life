//src/types/chat.ts

import type { FC } from "react";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  isError?: boolean;
};

export type ChatMode = "motivational" | "ai";

export type MessageListProps = {
  messages: Message[];
};

export interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export type ChatProps = Record<string, never>;

export type ChatComponent = FC<ChatProps>;

export type ChatTabProps = {
  activeMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
};
