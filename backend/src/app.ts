import express from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdf.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/docs", pdfRoutes);
app.use("/api/v1/model", chatRoutes);

export default app;
