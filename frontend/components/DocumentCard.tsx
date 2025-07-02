import React from "react";
import { CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { Document } from "@/types/types";
import formatFileSize from "@/utils/formatSize";

interface DocumentCardProps {
  document: Document;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  isSelected,
  onToggleSelect,
  onDelete,
}) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <h3 className="font-medium text-sm truncate">{document.name}</h3>
        <p className="text-xs text-gray-400">{formatFileSize(document.size)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(document.id)}
          className="rounded border-gray-600 text-orange-600 focus:ring-orange-500"
          disabled={document.status !== "ready"}
        />
        <button
          onClick={() => onDelete(document.id)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>

    {document.status === "uploading" && (
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${document.progress || 0}%` }}
        />
      </div>
    )}

    <div className="flex items-center mt-2">
      {document.status === "ready" && (
        <CheckCircle size={14} className="text-green-400 mr-1" />
      )}
      {document.status === "processing" && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent mr-1" />
      )}
      {document.status === "error" && (
        <AlertCircle size={14} className="text-red-400 mr-1" />
      )}
      <span className="text-xs text-gray-400 capitalize">
        {document.status}
      </span>
    </div>
  </div>
);

export default DocumentCard;
