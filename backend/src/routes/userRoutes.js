import express from "express";
import { register, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

export default userRouter;
