import express from "express";
import router from "./routes/route.js";

const app = express();

app.use(express.json());

app.use("/api/products", router);

app.listen(3000, () =>
  console.log("Backend server is running on port '3000' ")
);
