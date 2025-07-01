"use client";

import { Upload } from "lucide-react";
import React from "react";

export default function FileUpload() {
  const handleFileChange = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("multiple", "true");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files?.length === 0) {
        console.log("No file selected");
        return;
      }
      const form = new FormData();
      if (files) {
        Array.from(files).forEach((f) => {
          form.append("pdfs", f);
        });
      }

      fetch("http://localhost:8000/api/v1/upload/pdfs", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    el.click();
  };

  return (
    <div className="bg-slate-900 text-white shadow-xl flex justify-center items-center p-4 rounded-lg">
      <div
        onClick={handleFileChange}
        className="flex justify-center items-center flex-col gap-2 cursor-pointer"
      >
        <Upload />
        <h1>Upload a file</h1>
      </div>
    </div>
  );
}
