import type { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.util.js";
import ApiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import { createQdrantVectorStore } from "../config/db.config.js";
import llm, { generateSystemPrompt } from "../config/model.config.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const chatHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userQuery, collectionName } = req.body;
  if (!userQuery) {
    throw new ApiError(400, "Query is required");
  }
  if (!collectionName) {
    throw new ApiError(400, "Collection name is required");
  }

  // Initialize Qdrant vector store
  const vectorStore = await createQdrantVectorStore(collectionName);
  if (!vectorStore) {
    throw new ApiError(500, "Failed to create vector store");
  }

  // Create a retriever to fetch relevant documents
  const retriever = vectorStore.asRetriever({
    k: 3,
  });

  // Retrieve documents based on the user's query
  const retrievedDocs = await retriever.invoke(userQuery);

  if (!retrievedDocs || retrievedDocs.length === 0) {
    // Handle case where no relevant documents are found
    console.warn(
      `No relevant documents found for query: "${userQuery}" in collection: "${collectionName}"`,
    );
  }

  // Generate the system prompt with the retrieved context
  const systemPrompt = generateSystemPrompt(retrievedDocs);

  // Create messages for the LLM
  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(userQuery),
  ];

  // Invoke the LLM to get a response
  const llmResponse = await llm.invoke(messages);

  if (!llmResponse || !llmResponse.content) {
    throw new ApiError(500, "Failed to generate chat response from LLM");
  }

  res.status(200).json(
    new ApiResponse(200, "Chat response generated successfully", {
      response: llmResponse.content,
    }),
  );
});
