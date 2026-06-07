import pool from "../db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    res.json({ success: true, data: token });
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

async function requestPasswordReset() {
    
}
async function resetPassword() {}

export { login, register, requestPasswordReset, resetPassword };
