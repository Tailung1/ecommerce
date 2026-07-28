import multer from "multer";
import path from "path";

const uploadDir = "./uploads";
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
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileTypes.includes(file.mimtype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
const filterExcelFile = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileTypes.includes(file.mimtype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};
const multerImage = {
  storage: storage,
  filterImageFile,
};
const multerExcel = {
  storage: storage,
  filterExcelFile,
};

export { multerImage, multerExcel };
