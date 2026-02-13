import express from "express";
import cors from "cors";
import router from "./routes/route.js";

const app = express();

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

app.use("/api/products", router);

app.listen(3000, () =>
  console.log("Backend server is running on port '3000' ")
);
