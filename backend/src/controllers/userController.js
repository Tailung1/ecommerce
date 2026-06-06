import pool from "../db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const isUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!isUser) {
      if (!comparePassword) {
        throw new Error("Incorrect email");
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const comparePassword = await bcrypt.compare(hashedPassword, password);
    if (!comparePassword) {
      throw new Error("Incorrect password");
    }

    res.json(result);
  } catch (err) {
    res.status(200).send({ message: err.message });
  }
}

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query("INSERT INTO users (email,password) VALUES ($1,$2)", [
      email,
      hashedPassword,
    ]);
    res.json(result);
  } catch (err) {
    // bcs of its object, express will automatically convert them to JSON
    res.status(200).send({ message: err.message });
    // String → sent as plain text (NOT JSON)
    // res.status(200).send("done");
    // Always JSON → explicit, safe, consistent (recommended)
    // res.status(200).json("done");
  }
}

export { login, register };
