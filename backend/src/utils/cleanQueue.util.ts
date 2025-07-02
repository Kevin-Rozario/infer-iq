import queue from "../config/queue.config.js";

const numberOfJobs = 50;

const cleanQueue = async () => {
  await queue.clean(0, numberOfJobs, "completed");
  await queue.clean(0, numberOfJobs, "delayed");
  await queue.clean(0, numberOfJobs, "active");
  await queue.clean(0, numberOfJobs, "failed");
};

export default cleanQueue;
