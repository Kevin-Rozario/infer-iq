import "dotenv/config";
import { Worker } from "bullmq";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";

console.log("🚀 Worker started...");

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      const { filePath } = JSON.parse(job.data);

      if (!fs.existsSync(filePath)) {
        console.error("❌ File not found:", filePath);
        throw new Error("File not found");
      }

      // Stage 1: Load PDF
      const loader = new PDFLoader(filePath);
      const docs = await loader.load();
      console.log("✅ Stage 1: PDF loaded");

      // Stage 2: Split into chunks
      const splitter = new CharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 0,
      });
      const splitDocs = await splitter.splitDocuments(docs);
      console.log("✅ Stage 2: Document split into chunks");

      // Stage 3: Create embeddings
      const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY,
      });
      console.log("✅ Stage 3: Embeddings initialized");

      // Stage 4: Connect to Qdrant
      const client = new QdrantClient({
        url: "http://localhost:6333",
      });

      const vectorStore = await QdrantVectorStore.fromDocuments(
        splitDocs,
        embeddings,
        {
          client,
          collectionName: "pdf-docs",
        }
      );
      console.log("✅ Stage 4: Embeddings stored in Qdrant");
    } catch (err) {
      console.error("❌ Worker error:", err);
    }
  },
  {
    connection: {
      host: process.env.VALKEY_HOST || "localhost",
      port: 6379,
    },
    concurrency: 5,
  }
);

export default worker;
