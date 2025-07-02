import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import createVectorStore from "../config/db.config.js";
import fs from "fs";
import path from "path";

const vectorizePdfs = async (id: string, pdfPath: string) => {
  const resolvedPath = path.resolve(pdfPath);
  console.log("Resolved path", resolvedPath);

  if (!fs.existsSync(resolvedPath)) {
    console.warn("File not found: ", resolvedPath);
    return;
  }

  const loader = new PDFLoader(resolvedPath);
  const docs = await loader.load();

  docs.forEach((doc) => {
    doc.metadata.source = path.basename(pdfPath);
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`Document ${id}: ${splitDocs.length} chunks`);

  const vectorStore = await createVectorStore(docs);

  console.log("Embedding and storing completed.");
};

export default vectorizePdfs;
