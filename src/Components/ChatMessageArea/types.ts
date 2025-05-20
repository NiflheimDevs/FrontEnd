// src/components/ChatMessageArea/types.ts
export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
}

export interface Message {
  id: string;
  text: string;
  type: "sent" | "received";
  timestamp: string;
}

export interface Messages {
  [key: string]: Message[];
}

export interface SearchResult {
  id: string;
  name: string;
}