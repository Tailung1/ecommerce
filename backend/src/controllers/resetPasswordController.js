import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
const prisma = new PrismaClient();

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

async function requestOTP(req, res) {
  const { email } = req.body;
  console.log(email);
  try {
    if (!email) {
      throw new Error("Email isn't defined");
    }
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otpCode = generateOTP();
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
      text: `Your otp code is ${otpCode}`,
    });

    if (!sendOtp) {
      throw new Error("Failed to send OTP");
    }

    res.status(200).json({ message: "Otp code sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function verifyOTP(req, res) {
  const { email, otpCode } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { email: email } });

    if (otpCode === user.otpCode) {
      res.status(200).json({ message: "Otp code is correct" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function resetPassword(req, res) {}

export { requestOTP, verifyOTP, resetPassword };
