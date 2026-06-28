import express from "express";
import { requestOTP, verifyOTP, resetPassword } from "../controllers/resetPasswordController.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/request-otp", requestOTP);
resetPasswordRouter.post("/verify-otp", verifyOTP);
resetPasswordRouter.post("/reset-password", resetPassword);

export default resetPasswordRouter;
