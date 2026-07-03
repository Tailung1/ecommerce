import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function requestOTP(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error("Email isn't defined");
    }
    const user = await prisma.user.findUnique({ where: { email } });
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
      throw new Error("Failed to send OTP");
    }

    res.status(200).json({ sessionId: user.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function verifyOTP(req, res) {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (otp !== user.otpCode) {
      return res.status(400).json({ message: "Wrong OTP" });
    }
    if (otp === user.otpCode) {
      res.status(200).json({ message: "Otp code is correct" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function resetPassword(req, res) {
  const { newPassword, repeatNewPassword } = req.body;
  try {
  } catch (err) {}
}

export { requestOTP, verifyOTP, resetPassword };
