import express from "express";
import { multerImage } from "../middleware/uploadFile.js";
import { uploadImage } from "../controllers/fileController.js";

const fileRouter = express.Router();

fileRouter.post("/uploadImage", multerImage.single("image"), uploadImage);

export default fileRouter