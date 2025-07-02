import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Document } from "@/types/types";
import formatFileSize from "@/utils/formatSize";

interface UploadViewProps {
  documents: Document[];
  handleFileUpload: (files: FileList) => void;
}

const UploadView: React.FC<UploadViewProps> = ({
  documents,
  handleFileUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Upload Documents</h2>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          isDragging
            ? "border-orange-500 bg-orange-500/10"
            : "border-gray-600 hover:border-gray-500"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Drop your PDF files here</h3>
        <p className="text-gray-400 mb-4">
          or click to browse and select files
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
      </div>

      {documents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Uploaded Documents</h3>
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-gray-900/50 rounded-lg p-4 border border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText size={24} className="text-orange-500" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-400">
                        {formatFileSize(doc.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {doc.status === "ready" && (
                      <CheckCircle className="text-green-400" size={20} />
                    )}
                    {doc.status === "processing" && (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-500 border-t-transparent" />
                    )}
                    {doc.status === "error" && (
                      <AlertCircle className="text-red-400" size={20} />
                    )}
                    <span className="text-sm text-gray-400 capitalize">
                      {doc.status}
                    </span>
                  </div>
                </div>
                {doc.status === "uploading" && (
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${doc.progress || 0}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadView;
