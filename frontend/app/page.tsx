import React from "react";
import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <div className="min-h-screen border-1 border-white flex">
      <div className="flex-1/3 flex flex-col justify-center items-center">
        <FileUpload />
      </div>
      <div className="flex-2/3"></div>
    </div>
  );
}
