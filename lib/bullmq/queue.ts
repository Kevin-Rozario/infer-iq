import { Queue } from "bullmq";

const queue = new Queue("file-upload-queue");

export default queue;

