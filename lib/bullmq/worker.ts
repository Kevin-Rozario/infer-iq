import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";

console.log("🚀 Worker started...");

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    const { filePath } = JSON.parse(job.data);

    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      throw new Error("File not found");
    }

    // Load and split PDF
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 0,
    });

    const chunks = await splitter.splitDocuments(docs);
    console.log("📄 Split into chunks:", chunks.length);
  },
  {
    connection: {
      host: process.env.VALKEY_HOST || "localhost",
      port: 6379,
    },
    concurrency: 5,
  }
);

// Handle job completion or errors
// worker.on("completed", (job) => {
//   console.log(`✅ Job ${job.id} completed`);
// });

// worker.on("failed", (job, err) => {
//   console.error(`❌ Job ${job?.id} failed:`, err);
// });

export default worker;
