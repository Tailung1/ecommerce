import express from "express";
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/recover-password", requestPasswordReset);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
