import express from "express";
import {
  getProducts,
  getPopularSearches,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  CategoryStats,
} from "../controllers/p.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/popularSearches", getPopularSearches);
productRouter.get("/getProduct/:slug", getProduct);
productRouter.post("/createProduct", createProduct);
productRouter.post("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/getCategoryStats", CategoryStats);

export default productRouter;
