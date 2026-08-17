import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resetPasswordRouter from "./routes/resetPasswordRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import fileRouter from "./routes/fileRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Show every incoming request route
app.use((req, res, next) => {
  console.log("➡️ Request received:");
  console.log("Method:", req.method);
  console.log("Route:", req.originalUrl);
  next();
});

// Static files
app.use("/uploads", express.static("backend/uploads"));

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

// Routes
app.use("/api/products", productRouter);
app.use("/api/uploads", fileRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/reset-password", resetPasswordRouter);


app.use((req, res) => {
  console.log("Route not found:", req.method, req.originalUrl);
  res.status(404).json({ message: "Route Not found" });
});

app.use(errorHandler);

app.listen(3000, () => console.log("Backend server is running on port '3000'"));
