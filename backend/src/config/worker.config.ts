import { Worker } from "bullmq";

export function createWorker() {
  const worker = new Worker(
    "file-upload-queue",
    async (job) => {
      console.log(`Processing job ${job.id}`);
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
