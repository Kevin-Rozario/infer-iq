import { Worker } from "bullmq";
import vectorizePdfs from "../services/vectorizePdfs.service.js";

export function createWorker() {
  const worker = new Worker(
    "file-upload-queue",
    async (job) => {
      const { filePath } = job.data;
      await vectorizePdfs(job.id!, filePath);
    },
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
      concurrency: 100,
    },
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
  });

  return worker;
}
