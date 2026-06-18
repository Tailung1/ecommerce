import express from "express";
import authMiddleware from "../server.js";
import {
  register,
  login,
  recoveryPassword,
  requestPasswordReset,
  verifyResetCode,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/requestPasswordReset", requestPasswordReset);
userRouter.post("/verifyResetCode", verifyResetCode);
userRouter.post("/recover-password", authMiddleware, recoveryPassword);

export default userRouter;
