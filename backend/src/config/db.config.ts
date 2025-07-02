import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Document } from "langchain/document";
import embeddings from "./embeddings.config.js"; // this should be GoogleGenerativeAIEmbeddings

const COLLECTION_NAME = "pdf_collection";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
});

async function ensureCollectionExists() {
  const collections = await client.getCollections();
  const exists = collections.collections.some(
    (c) => c.name === COLLECTION_NAME,
  );

  if (!exists) {
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });
    console.log(`✅ Created collection "${COLLECTION_NAME}"`);
  } else {
    console.log(`ℹ️ Collection "${COLLECTION_NAME}" already exists`);
  }
}

async function createVectorStore(docs: Document<Record<string, any>>[]) {
  await ensureCollectionExists();

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    client,
    collectionName: COLLECTION_NAME,
  });

  console.log(`✅ Embeddings stored in "${COLLECTION_NAME}"`);

  return vectorStore;
}

export default createVectorStore;
