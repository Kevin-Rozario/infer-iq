import React from "react";
import { ChatMessage } from "@/types/types";

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageBlock: React.FC<ChatMessageProps> = ({ message }) => (
  <div
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-3xl px-4 py-3 rounded-lg ${
        message.sender === "user"
          ? "bg-orange-600 text-white"
          : "bg-gray-800 text-gray-100 border border-gray-700"
      }`}
    >
      <p>{message.content}</p>
      <p className="text-xs opacity-70 mt-1">
        {message.timestamp.toLocaleTimeString()}
      </p>
    </div>
  </div>
);

export default ChatMessageBlock;
