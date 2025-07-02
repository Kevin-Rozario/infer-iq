import { Router } from "express";
import { chatHandler } from "../controllers/chat.controller.js";

const router = Router();

router.route("/chat").get(chatHandler);

export default router;
