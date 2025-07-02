import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Document } from "langchain/document";
import embeddings from "./embeddings.config.js";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
});

async function createVectorStore(docs: Document<Record<string, any>>[]) {
  return await QdrantVectorStore.fromDocuments(docs, embeddings, {
    client,
    collectionName: "pdf_collection",
  });
}

export default createVectorStore;
