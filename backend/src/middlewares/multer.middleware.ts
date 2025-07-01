import multer from "multer";

const uploadPdfsMiddleware = (destination: string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({ storage });
};

export const uploadMultiplePdf = uploadPdfsMiddleware("uploads").array(
  "pdfs",
  10,
);
