import { Router } from "express";
import { listCollections, pdfHandler } from "../controllers/pdf.controller.js";
import { uploadMultiplePdf } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/collections").get(listCollections);
router.route("/upload/pdfs").post(uploadMultiplePdf, pdfHandler);

export default router;
