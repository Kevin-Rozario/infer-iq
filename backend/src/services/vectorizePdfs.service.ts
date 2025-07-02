import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  createQdrantVectorStore,
  addDocumentsToQdrant,
} from "../config/db.config.js";
import fs from "fs";
import path from "path";

// Vectorize PDFs
const vectorizePdfs = async (
  jobId: string,
  pdfPath: string,
  collectionName: string,
) => {
  const resolvedPath = path.resolve(pdfPath);

  if (!fs.existsSync(resolvedPath)) {
    console.warn("File not found: ", resolvedPath);
    return;
  }

  // Load PDF documents
  const loader = new PDFLoader(resolvedPath);
  const docs = await loader.load();

  // Add source metadata to each document
  docs.forEach((doc) => {
    doc.metadata.source = path.basename(pdfPath);
  });

  // Split documents into manageable chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });
  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`Job ${jobId}: Split into ${splitDocs.length} chunks`);

  // Initialize Qdrant vector store
  const vectorStore = await createQdrantVectorStore(collectionName);

  // Add documents to Qdrant
  await addDocumentsToQdrant(vectorStore, splitDocs);

  console.log(
    `Job ${jobId}: Embedding and storing completed for ${path.basename(pdfPath)}.`,
  );
};

export default vectorizePdfs;
