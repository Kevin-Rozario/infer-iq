import { Router } from "express";
import { pdfHandler } from "../controllers/pdf.controller.js";
import { uploadMultiplePdf } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/pdfs").post(uploadMultiplePdf, pdfHandler);

export default router;
