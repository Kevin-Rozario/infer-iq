export interface Document {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  status: "uploading" | "processing" | "ready" | "error";
  progress?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  documentId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  documentIds: string[];
  messages: ChatMessage[];
  lastActive: Date;
}
