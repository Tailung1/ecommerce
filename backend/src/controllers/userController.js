// import pool from "../db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const isProd = process.env.NODE_ENV !== "development";

async function login(req, res) {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  console.log(isProd);
  try {
    // const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    // const User = user.rows[0];
    // if (!User) {
    //   throw new Error("Incorrect email");
    // }
    // prisma
    const user = await prisma.users.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      throw new Error("Incorrect email");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: false, // only sent over HTTPS
      sameSite: "strict", // protects against CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day // optional: cookie expires in 1 day
    });
    res.json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    console.log(err.message);
    // bcs of its object, express will automatically convert them to JSON
    res.status(400).json({ success: false, message: err.message });
    // String → sent as plain text (NOT JSON)
    // res.status(400).send("done");
    // Always JSON → explicit, safe, consistent (recommended)
    // res.status(400).json("done")
  }
}

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    // const user = await pool.query("SELECT * FROM users WHERE email=$1", [normalizedEmail]);
    // const User = user.rows[0];
    //  const result = await pool.query(
    //    "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *",
    //    [email, hashedPassword]
    //  );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { email: normalizedEmail, password: hashedPassword },
    });

    res.json({ message: "Registered successfully", user });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({ message: "Email already exists" });
        // 409 responses are errors sent to the client so that a user might be able to resolve a conflict and resubmit the request.
      }
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

async function requestPasswordReset(req, res) {
  const { email } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    console.log(0);

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
    console.log(1);

    const sendOtp = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      text: `Your otp code is ${otpCode}`,
    });
    console.log(2);

    console.log(sendOtp)
    if (!sendOtp) {
      throw new Error("Failed to send OTP");
    }

    res.status(200).json({ message: "Otp code sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function verifyResetCode(req, res) {
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

async function recoveryPassword() {}

export { login, register, recoveryPassword, requestPasswordReset, verifyResetCode };
