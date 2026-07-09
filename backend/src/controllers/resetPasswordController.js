import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
import { passwordResetRequestLimiter } from "../utils/passwordResetRequestLimiter.js";
// import RateLimitError from "../utils/passwordResetRequestLimitError.js";
import AppError from "../errors/AppError.js";
import errorHandler from "../middleware/errorHandler.js";

async function requestOTP(req, res, next) {
  const { email } = req.body;
  try {
    if (!email) {
      throw new AppError(400, "Email isn't defined");
    }
    try {
      await passwordResetRequestLimiter.consume(email);
    } catch (err) {
      if (typeof err.msBeforeNext === "number") {
        throw new AppError(429, "Too many requests");
        // err.msBeforeNext is given in milliseconds(ms), But APIs (and HTTP conventions) usually expect seconds.
        //   retryAfter: Math.ceil(err.msBeforeNext / 1000),
      }
      throw new AppError(500, "Unexpected limiter error");
    }

    const user = await prisma.user.findFirst({ where: { email }, orderBy: { created_at: "desc" } }); // descending;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.passwordResetSession.create({
      data: {
        userId: user.id,
        otpHash,
        status: "PENDING",
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const sendOtp = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      text: `Your otp code is ${otp}`,
    });

    if (!sendOtp) {
      throw new AppError(503, "Failed to send OTP");
    }

    res.status(200).json({ sessionId: user.id });
  } catch (err) {
    next(errorHandler);
  }
}

async function verifyOTP(req, res, next) {
  const { userId, otp } = req.body;
  try {
    const sessionObject = await prisma.passwordResetSession.findFirst({
      where: { userId, status: "PENDING", expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });
    if (!sessionObject) {
      throw new AppError(404, "Session not found");
    }
    if (sessionObject.attempts === 3) {
      throw new AppError(404, "Otp attempt limit reached max, try again later");
    }
    const passwordCompareCheck = await bcrypt.compare(otp, sessionObject.otpHash);

    if (!passwordCompareCheck) {
      await prisma.passwordResetSession.update({
        where: { id: sessionObject.id },
        data: {
          attempts: sessionObject.attempts + 1,
        },
      });
      throw new AppError(404, "Wrong OTP");
    }
    await prisma.passwordResetSession.update({
      where: { id: sessionObject.id },
      data: { status: "VERIFIED" },
    });
    res.status(200).json({ message: "Otp is correct" });
  } catch (err) {
    next(errorHandler);
  }
}

async function resetPassword(req, res, next) {
  const { userId, newPassword } = req.body;
  try {
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    const session = await prisma.passwordResetSession.findFirst({
      where: { userId, status: "VERIFIED", expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });
    if (!session) {
      throw new AppError(404, "Session not found");
    }
    await prisma.passwordResetSession.update({
      where: { id: session.id },
      data: { status: "USED" },
    });

    await prisma.user.update({ where: { id: userId }, data: { password: hashNewPassword } });

    return res.status(200).json({ message: "Password updated successefully" });
  } catch (err) {
    next(errorHandler);
  }
}

export { requestOTP, verifyOTP, resetPassword };
