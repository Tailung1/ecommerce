import express from "express";
import cors from "cors";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(3000, () => console.log("Backend server is running on port '3000' "));
