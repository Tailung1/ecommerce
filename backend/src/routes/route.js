import express from "express";
import {
  getProducts,
  getPopularSearches,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  CategoryStats,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/popularSearches", getPopularSearches);
// router.get("/:id", getOneProducts);
router.post("/createProduct", createProduct);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/getCategoryStats", CategoryStats);

export default router;
