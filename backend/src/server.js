import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resetPasswordRouter from "./routes/resetPasswordRoutes.js";

const app = express();

// const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

export default function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrongggg2",
  });
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/reset-password", resetPasswordRouter);
app.use((req, res) => res.json("Route Not found"));

app.listen(3000, () => console.log("Backend server is running on port '3000' "));
