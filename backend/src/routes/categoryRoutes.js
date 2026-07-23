import { createCategory, getCategories } from "../controllers/categoryController.js";
import express from "express";
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);

export default categoryRouter;
