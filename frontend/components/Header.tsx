import React from "react";
import { Menu, Brain } from "lucide-react";

interface HeaderProps {
  currentView: "dashboard" | "upload" | "chat";
  setCurrentView: (view: "dashboard" | "upload" | "chat") => void;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  setSidebarOpen,
}) => (
  <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <Brain className="text-orange-500" size={32} />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          Infer IQ
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentView === "dashboard" ? "bg-orange-600" : "hover:bg-gray-800"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView("upload")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentView === "upload" ? "bg-orange-600" : "hover:bg-gray-800"
          }`}
        >
          Upload
        </button>
      </div>
    </div>
  </header>
);

export default Header;
