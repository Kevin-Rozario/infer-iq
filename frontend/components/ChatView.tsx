import React, { useEffect, useRef } from "react";
import ChatMessageBlock from "./ChatMessageBlock";
import ChatInput from "./ChatInput";
import { ChatSession } from "@/types/types";
import { MessageCircle } from "lucide-react";

interface ChatViewProps {
  currentChat: ChatSession;
  chatInput: string;
  setChatInput: (input: string) => void;
  sendMessage: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({
  currentChat,
  chatInput,
  setChatInput,
  sendMessage,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat.messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 p-4">
        <h2 className="text-xl font-semibold">{currentChat.title}</h2>
        <p className="text-sm text-gray-400">
          Chatting about {currentChat.documentIds.length} document(s)
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentChat.messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <MessageCircle size={48} className="mx-auto mb-4" />
            <p>Start a conversation about your documents</p>
          </div>
        ) : (
          currentChat.messages.map((message) => (
            <ChatMessageBlock key={message.id} message={message} />
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <ChatInput
        value={chatInput}
        onChange={setChatInput}
        onSend={sendMessage}
        isDisabled={!chatInput.trim()}
      />
    </div>
  );
};

export default ChatView;
