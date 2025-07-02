import React from "react";
import { Document, ChatSession } from "@/types/types";
import { FileText, MessageCircle, Plus } from "lucide-react";
import DocumentCard from "./DocumentCard";
import ChatSessionCard from "./ChatSessionCard";

interface SidebarProps {
  sidebarOpen: boolean;
  documents: Document[];
  selectedDocuments: string[];
  chatSessions: ChatSession[];
  currentChatId: string | null;
  onToggleSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onStartNewChat: () => void;
  onSelectChatSession: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  documents,
  selectedDocuments,
  chatSessions,
  currentChatId,
  onToggleSelectDocument,
  onDeleteDocument,
  onStartNewChat,
  onSelectChatSession,
  setSidebarOpen,
}) => (
  <aside
    className={`${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } fixed lg:relative lg:translate-x-0 z-30 w-80 h-screen bg-black/50 backdrop-blur-sm border-r border-gray-800 transition-transform duration-300 overflow-y-auto`}
  >
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FileText size={20} className="mr-2" />
        Documents ({documents.length})
      </h2>

      <div className="space-y-3 mb-6">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            isSelected={selectedDocuments.includes(doc.id)}
            onToggleSelect={onToggleSelectDocument}
            onDelete={onDeleteDocument}
          />
        ))}
      </div>

      {selectedDocuments.length > 0 && (
        <button
          onClick={onStartNewChat}
          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <Plus size={18} className="mr-2" />
          Start New Chat
        </button>
      )}

      <div className="mt-8">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <MessageCircle size={16} className="mr-2" />
          Chat Sessions
        </h3>
        <div className="space-y-2">
          {chatSessions.map((session) => (
            <ChatSessionCard
              key={session.id}
              session={session}
              currentChatId={currentChatId}
              onSelectSession={(id) => {
                onSelectChatSession(id);
                setSidebarOpen(false); // Close sidebar on mobile after selecting chat
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;
