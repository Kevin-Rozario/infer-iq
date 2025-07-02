import React from "react";
import { Upload, Brain, MessageCircle } from "lucide-react";

const DashboardView: React.FC = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent">
        Welcome to Infer IQ
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Transform your documents into intelligent conversations. Upload PDFs and
        chat with AI to extract insights, ask questions, and discover knowledge
        hidden in your files.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <Upload className="text-orange-500 mb-4" size={32} />
        <h3 className="text-xl font-semibold mb-3">Upload Documents</h3>
        <p className="text-gray-300">
          Drag and drop your PDF files or click to browse. We will process and
          vectorize your documents for AI analysis.
        </p>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <Brain className="text-orange-500 mb-4" size={32} />
        <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
        <p className="text-gray-300">
          Our advanced AI understands your document content and creates
          intelligent embeddings for semantic search.
        </p>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <MessageCircle className="text-orange-500 mb-4" size={32} />
        <h3 className="text-xl font-semibold mb-3">Chat & Discover</h3>
        <p className="text-gray-300">
          Ask questions about your documents and get intelligent answers.
          Extract insights and find information instantly.
        </p>
      </div>
    </div>

    {/* The "Get Started" button for navigation */}
    <div className="text-center">
      <button
        onClick={() => setCurrentView("upload")}
        className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Get Started - Upload Your First Document
      </button>
    </div>
  </div>
);

export default DashboardView;
