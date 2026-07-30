import multer from "multer";
import path from "path";

const uploadDir = "backend/uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const filterImageFile = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg","image/svg+xml"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
const filterExcelFile = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
const imageUpload = multer({
  storage: storage,
  fileFilter: filterImageFile,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
const spreadSheetUpload = multer({
  storage: storage,
  fileFilter: filterExcelFile,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export { imageUpload, spreadSheetUpload };
