import React from "react";
import { ChatSession } from "@/types/types";

interface ChatSessionCardProps {
  session: ChatSession;
  currentChatId: string | null;
  onSelectSession: (id: string) => void;
}

const ChatSessionCard: React.FC<ChatSessionCardProps> = ({
  session,
  currentChatId,
  onSelectSession,
}) => (
  <button
    key={session.id}
    onClick={() => onSelectSession(session.id)}
    className={`w-full text-left p-3 rounded-lg transition-colors ${
      currentChatId === session.id
        ? "bg-orange-600/30 border border-orange-500/50"
        : "hover:bg-gray-800/50"
    }`}
  >
    <div className="text-sm font-medium truncate">{session.title}</div>
    <div className="text-xs text-gray-400">
      {session.messages.length} messages
    </div>
  </button>
);

export default ChatSessionCard;
