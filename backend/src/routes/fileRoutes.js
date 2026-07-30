import express from "express";
import { imageUpload, spreadSheetUpload } from "../middleware/multerConfiguration.js";
import {
  uploadImage,
  uploadImages,
  uploadSpreadsheet,
  uploadSpreadsheets,
} from "../controllers/uploadController.js";

const fileRouter = express.Router();

fileRouter.post("/images", imageUpload.single("image"), uploadImage);
fileRouter.post("/images/bulk", imageUpload.array("image", 5), uploadImages);
fileRouter.post("/spreadsheets", spreadSheetUpload.single("spreadsheet"), uploadSpreadsheet);
fileRouter.post(
  "/spreadsheets/bulk",
  spreadSheetUpload.array("spreadsheet", 5),
  uploadSpreadsheets
);

export default fileRouter;
