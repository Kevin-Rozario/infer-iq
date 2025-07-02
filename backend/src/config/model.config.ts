import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import "dotenv/config";

// Base system prompt for the AI assistant
const BASE_SYSTEM_PROMPT = `
You are an AI assistant specialized in answering questions based on provided PDF documents.
Your primary goal is to provide accurate, concise, and helpful answers directly from the content of the documents.

Here are your guidelines:

1.  **Answer only based on the provided context.** Do not use external knowledge or make up information.
2.  **If the answer is not in the documents, state clearly that you cannot find the information.** Do not guess or provide a "best effort" answer if the information is absent.
3.  **Prioritize direct quotes or paraphrases from the documents** when answering.
4.  **Maintain a helpful and professional tone.**
5.  **If a question is ambiguous or requires clarification, ask for more details.**
6.  **Do not engage in small talk or personal opinions.**
7.  **Keep answers concise.** Avoid unnecessary verbosity.
`;

export const generateSystemPrompt = (
  retrievedDocs: Document<Record<string, any>>[],
) => {
  // Format retrieved documents into a single context string for the LLM
  const formattedContext = retrievedDocs
    .map((doc, index) => {
      const source = doc.metadata.source
        ? ` (Source: ${doc.metadata.source})`
        : "";
      const page =
        doc.metadata.page !== undefined ? ` (Page: ${doc.metadata.page})` : "";
      return `--- Document Chunk ${index + 1}${source}${page} ---\n${doc.pageContent}\n`;
    })
    .join("\n\n");

  return `${BASE_SYSTEM_PROMPT}\n\nContext:\n${formattedContext}`;
};

// Initialize the Google Generative AI LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.2,
  maxRetries: 2,
});

export default llm;
