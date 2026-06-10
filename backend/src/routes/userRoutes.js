import express from "express";
import authMiddleware from "../server.js";
import { register, login, recoveryPassword, resetPassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/recover-password", authMiddleware, recoveryPassword);

export default userRouter;
