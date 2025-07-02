import React from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isDisabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  isDisabled,
}) => (
  <div className="bg-black/50 backdrop-blur-sm border-t border-gray-800 p-4">
    <div className="flex space-x-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
        placeholder="Ask a question about your documents..."
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        onClick={onSend}
        disabled={isDisabled}
        className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
      >
        <Send size={18} />
      </button>
    </div>
  </div>
);

export default ChatInput;
