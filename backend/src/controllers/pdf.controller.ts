import type { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.util.js";
import ApiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import cleanQueue from "../utils/cleanQueue.util.js";
import queue from "../config/queue.config.js";
import { getQdrantClient } from "../config/db.config.js";

// Upload multiple PDF files
export const pdfHandler = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const { collectionName } = req.body;

  if (!files || files.length === 0) {
    throw new ApiError(400, "No files uploaded");
  }
  if (!collectionName) {
    throw new ApiError(400, "Collection name is required");
  }

  // Clear existing jobs in the queue
  await cleanQueue();

  // Add each uploaded file to queue for processing
  await Promise.all(
    files.map((file) =>
      queue.add(
        "initialize-vector-store-job",
        {
          collectionName,
          fileName: file.originalname,
          filePath: file.path,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      ),
    ),
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Files uploaded successfully and queued for processing",
      ),
    );
});

// List all collections in Qdrant
export const listCollections = asyncHandler(
  async (req: Request, res: Response) => {
    const qdrantClient = getQdrantClient();
    const collections = await qdrantClient.getCollections();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Collections listed successfully",
          collections.collections,
        ),
      );
  },
);
