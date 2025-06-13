"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
      // Handle file upload logic here
      setSelectedFile(null);
    }
  };

  return (
    <div className="w-[60vw] mx-auto border border-zinc-800 rounded-lg flex items-center">
      <Input
        placeholder="Ask anything about the document..."
        className="border-none rounded-none flex-1"
      />
      <Dialog>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button className="bg-transparent text-zinc-500 hover:bg-transparent hover:text-zinc-300 border-none rounded-none">
                <Link height={20} width={20} />
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleFileUpload} disabled={!selectedFile}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatBar;
