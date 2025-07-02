import { Embeddings } from "@langchain/core/embeddings";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import "dotenv/config";

// Google Generative AI Embeddings
const embeddings: Embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004", // This model outputs 768 dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "pdf-embeddings",
});

export default embeddings;
