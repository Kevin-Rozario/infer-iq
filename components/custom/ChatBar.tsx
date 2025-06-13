"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ChatBar() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      try {
        setUploading(true);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setSelectedFile(null);
        setUploading(false);
        setOpen(false);
      }
    }
  };

  return (
    <div className="w-[60vw] mx-auto border border-zinc-800 rounded-lg flex items-center">
      <Input
        placeholder="Ask anything about the document..."
        className="border-none rounded-none flex-1"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button className="bg-transparent text-zinc-500 hover:bg-transparent hover:text-zinc-300 border-none rounded-none">
                <LinkIcon height={20} width={20} />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>Upload a file</TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload a file</DialogTitle>
            <DialogDescription>
              Select a document to upload and analyze.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Input
                name="upload-file"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={uploading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleFileUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatBar;
