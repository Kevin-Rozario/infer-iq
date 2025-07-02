import { Worker } from "bullmq";
import vectorizePdfs from "../services/vectorizePdfs.service.js";

// Create a new worker
export function createWorker() {
  const worker = new Worker(
    "file-upload-queue",
    async (job) => {
      const { collectionName, filePath } = job.data;
      // Call the service to vectorize the PDF
      await vectorizePdfs(job.id!, filePath, collectionName);
    },
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
      concurrency: 100,
    },
  );

  // Log job completion
  worker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed`);
  });

  // Log job failure
  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
  });

  return worker;
}
