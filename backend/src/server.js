import express from "express";
import { getProducts } from "./controllers/productController.js";

const app = express();

app.use(express());

app.get("/", getProducts);

app.listen(3000, () =>
  console.log("Backend server is running on port '3000' ")
);


