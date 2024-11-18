import type { FC } from "react";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type ChatMode = "motivational" | "ai";

export type MessageListProps = {
  messages: Message[];
};

export type MessageInputProps = {
  onSendMessage: (text: string) => void;
};

export type ChatProps = Record<string, never>;

export type ChatComponent = FC<ChatProps>;

export type ChatTabProps = {
  activeMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
};
