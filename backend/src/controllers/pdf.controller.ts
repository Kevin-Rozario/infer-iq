import type { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.util.js";
import ApiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import cleanQueue from "../utils/cleanQueue.util.js";
import queue from "../config/queue.config.js";

export const pdfHandler = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    throw new ApiError(400, "No files uploaded");
  }

  // Clean the queue
  await cleanQueue();

  // Add files to the queue
  await Promise.all(
    files.map((file) =>
      queue.add(
        "file-process-job",
        {
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

  res.status(200).json(new ApiResponse(200, "Files uploaded successfully"));
});
