import { QdrantClient } from "@qdrant/js-client-rest";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import embeddings from "./embeddings.config.js";

// Qdrant connection url
const connectionUrl =
  process.env.QDRANT_CONNECTION_URL ?? "http://localhost:6333";

// Create Qdrant vector store
export async function createQdrantVectorStore(
  collectionName: string,
  recreateCollection: boolean = false,
): Promise<QdrantVectorStore> {
  console.log(`Connecting to Qdrant at ${connectionUrl}...`);
  try {
    const client = new QdrantClient({
      url: connectionUrl,
    });

    const collectionsResponse = await client.getCollections();
    const collectionExists = collectionsResponse.collections.some(
      (c: { name: string }) => c.name === collectionName,
    );

    if (collectionExists && recreateCollection) {
      console.log(
        `Collection '${collectionName}' exists. Deleting and recreating.`,
      );
      await client.deleteCollection(collectionName);
    }

    const currentCollectionsResponse = await client.getCollections();
    const currentCollectionExists = currentCollectionsResponse.collections.some(
      (c: { name: string }) => c.name === collectionName,
    );

    if (!currentCollectionExists) {
      console.log(
        `Collection '${collectionName}' does not exist. Creating new collection.`,
      );

      // The text-embedding-004 model outputs 768 dimensions
      const vectorSize = 768;
      await client.createCollection(collectionName, {
        vectors: {
          size: vectorSize,
          distance: "Cosine",
        },
      });
      console.log(`Collection '${collectionName}' created.`);
    } else {
      console.log(`Collection '${collectionName}' will be used.`);
    }

    return new QdrantVectorStore(embeddings, { client, collectionName });
  } catch (e) {
    console.error(`Error with Qdrant connection or collection: ${e}`);
    throw e;
  }
}

// Add documents to Qdrant
export async function addDocumentsToQdrant(
  vectorStore: QdrantVectorStore,
  documents: Document[],
): Promise<string[]> {
  if (!documents || documents.length === 0) {
    console.log("No documents provided to add.");
    return [];
  }

  console.log(
    `Adding ${documents.length} documents to '${vectorStore.collectionName}'...`,
  );
  try {
    await vectorStore.addDocuments(documents);
    console.log(`Added ${documents.length} documents.`);
    return documents.map((_, idx) => idx.toString());
  } catch (e) {
    console.error(`Error adding documents to Qdrant: ${e}`);
    throw e;
  }
}

// Get Qdrant client
export function getQdrantClient(): QdrantClient {
  return new QdrantClient({
    url: connectionUrl,
  });
}
