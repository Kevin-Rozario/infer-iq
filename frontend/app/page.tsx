"use client";
import React, { useState, useCallback } from "react";
import { Document, ChatSession, ChatMessage } from "@/types/types";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChatView from "@/components/ChatView";
import UploadView from "@/components/UploadView";
import DashboardView from "@/components/DashboardView";

const InferIQApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "upload" | "chat"
  >("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleFileUpload = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type === "application/pdf") {
        const newDoc: Document = {
          id:
            Date.now().toString() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          uploadDate: new Date(),
          status: "uploading",
          progress: 0,
        };

        setDocuments((prev) => [...prev, newDoc]);

        // Simulate upload progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 25;
          if (progress >= 100) {
            clearInterval(progressInterval);
            setDocuments((prev) =>
              prev.map((doc) =>
                doc.id === newDoc.id
                  ? { ...doc, progress: 100, status: "processing" }
                  : doc,
              ),
            );
            // Simulate processing completion after upload
            setTimeout(() => {
              setDocuments((prev) =>
                prev.map((doc) =>
                  doc.id === newDoc.id ? { ...doc, status: "ready" } : doc,
                ),
              );
              // TODO: Backend Call - After successful upload and processing, send document data to backend.
              // Example:
              // fetch('/api/upload-document', {
              //   method: 'POST',
              //   body: JSON.stringify({ documentId: newDoc.id, name: newDoc.name, size: newDoc.size }),
              //   headers: { 'Content-Type': 'application/json' },
              // }).then(res => res.json()).then(data => console.log(data));
            }, 2000); // Shorter processing time for demo
            return;
          }
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === newDoc.id
                ? { ...doc, progress: Math.min(progress, 99) }
                : doc,
            ),
          );
        }, 300); // Faster progress for demo
      }
    });
  }, []);

  const sendMessage = useCallback(() => {
    if (!chatInput.trim() || selectedDocuments.length === 0) return;

    const currentSession = chatSessions.find((s) => s.id === currentChatId);
    if (!currentSession) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: chatInput,
      sender: "user",
      timestamp: new Date(),
    };

    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === currentChatId
          ? {
              ...session,
              messages: [...session.messages, userMessage],
              lastActive: new Date(),
            }
          : session,
      ),
    );
    setChatInput("");

    // Simulate AI response
    // TODO: Backend Call - Send user message and selected document IDs to backend for AI processing.
    // The backend would then call the LLM (e.g., Gemini API) to generate a response based on the document content.
    // Example:
    // fetch('/api/chat', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     sessionId: currentChatId,
    //     message: chatInput,
    //     documentIds: selectedDocuments,
    //   }),
    //   headers: { 'Content-Type': 'application/json' },
    // }).then(res => res.json()).then(data => {
    //   const aiResponseContent = data.aiResponse; // Assuming backend returns { aiResponse: "..." }
    //   const aiMessage: ChatMessage = {
    //     id: (Date.now() + 1).toString(),
    //     content: aiResponseContent,
    //     sender: "ai",
    //     timestamp: new Date(),
    //   };
    //   setChatSessions((prev) =>
    //     prev.map((session) =>
    //       session.id === currentChatId
    //         ? { ...session, messages: [...session.messages, aiMessage] }
    //         : session,
    //     ),
    //   );
    // });

    // Simulated AI response for now
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Based on the document(s) you've uploaded, I can help answer your question about "${userMessage.content}". This is a simulated response that would normally be generated by analyzing the PDF content using AI.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === currentChatId
            ? { ...session, messages: [...session.messages, aiMessage] }
            : session,
        ),
      );
    }, 1500);
  }, [chatInput, selectedDocuments, chatSessions, currentChatId]);

  const startNewChat = useCallback(() => {
    if (selectedDocuments.length === 0) return;

    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat about ${selectedDocuments.length} document(s)`,
      documentIds: [...selectedDocuments],
      messages: [],
      lastActive: new Date(),
    };

    setChatSessions((prev) => [...prev, newSession]);
    setCurrentChatId(newSession.id);
    setCurrentView("chat");
    // TODO: Backend Call - Create a new chat session in the backend.
    // Example:
    // fetch('/api/create-chat-session', {
    //   method: 'POST',
    //   body: JSON.stringify({ sessionId: newSession.id, documentIds: newSession.documentIds }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }, [selectedDocuments]);

  const deleteDocument = useCallback((docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    setSelectedDocuments((prev) => prev.filter((id) => id !== docId));
    // TODO: Backend Call - Delete document from backend storage.
    // Example:
    // fetch(`/api/delete-document/${docId}`, { method: 'DELETE' });
  }, []);

  const toggleSelectDocument = useCallback((docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId],
    );
  }, []);

  const selectChatSession = useCallback((sessionId: string) => {
    setCurrentChatId(sessionId);
    setCurrentView("chat");
  }, []);

  const currentChat = chatSessions.find((s) => s.id === currentChatId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          documents={documents}
          selectedDocuments={selectedDocuments}
          chatSessions={chatSessions}
          currentChatId={currentChatId}
          onToggleSelectDocument={toggleSelectDocument}
          onDeleteDocument={deleteDocument}
          onStartNewChat={startNewChat}
          onSelectChatSession={selectChatSession}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 min-h-screen">
          {currentView === "dashboard" && <DashboardView />}

          {currentView === "upload" && (
            <UploadView
              documents={documents}
              handleFileUpload={handleFileUpload}
            />
          )}

          {currentView === "chat" && currentChat && (
            <ChatView
              currentChat={currentChat}
              chatInput={chatInput}
              setChatInput={setChatInput}
              sendMessage={sendMessage}
            />
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default InferIQApp;
