import pool from "../db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const User = user.rows[0];
    if (!User) {
      throw new Error("Incorrect email");
    }
    const comparePassword = await bcrypt.compare(password, User.password);
    if (!comparePassword) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: false, // only sent over HTTPS
      sameSite: "strict", // protects against CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day // optional: cookie expires in 1 day
    });
    res.json({ success: true, message: "Logged in successfully" });
  } catch (err) {
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
    const normalizedEmil = email.toLowerCase();
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [normalizedEmil]);
    const User = user.rows[0];
    if (User) {
      return res.json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *",
      [email, hashedPassword]
    );
    res.json("Registered successfully");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
async function resetPassword(req, res) {
  const { userEmail } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      text: `Your otp code is 5821`,
    });
    res.status(200).json({ message: "Otp code sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function recoveryPassword() {}

export { login, register, recoveryPassword, resetPassword };
