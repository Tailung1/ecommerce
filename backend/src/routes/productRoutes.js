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
productRouter.get("/product/:slug", getProduct);
productRouter.post("/product", createProduct);
productRouter.post("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/categoryStats", CategoryStats);

export default productRouter;
