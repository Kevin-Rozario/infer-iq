import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { uploadMultiplePdf } from "./middlewares/multer.middleware.js";
import ApiResponse from "./utils/apiResponse.util.js";
import queue from "./config/queue.config.js";
import ApiError from "./utils/apiError.util.js";
import cleanQueue from "./utils/cleanQueue.util.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/api/v1/upload/pdfs",
  uploadMultiplePdf,
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      throw new ApiError(400, "No files uploaded");
    }

    // Clean the queue
    await cleanQueue();

    await Promise.all(
      files.map((file) =>
        queue.add(
          "file-process-job",
          {
            fileName: file.originalname,
            path: file.path,
          },
          {
            removeOnComplete: true,
            removeOnFail: true,
          },
        ),
      ),
    );
    res.status(200).json(new ApiResponse(200, "Files uploaded successfully!"));
  },
);

export default app;
