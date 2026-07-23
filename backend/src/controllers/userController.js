// import pool from "../db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import prisma from "../../prisma/prismClient.js";

// const isProd = process.env.NODE_ENV !== "development";

async function login(req, res, next) {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  try {
    // const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    // const User = user.rows[0];
    // if (!User) {
    //   throw new Error("Incorrect email");
    // }
    // prisma
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      throw new AppError(404, "Incorrect email");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new AppError(404, "Incorrect password");
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
    next(err);
    // bcs of its object, express will automatically convert them to JSON

    // String → sent as plain text (NOT JSON)
    // res.status(400).send("done");
    // Always JSON → explicit, safe, consistent (recommended)
    // res.status(400).json("done")
  }
}

async function register(req, res, next) {
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
    const user = await prisma.user.create({
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

export { login, register };
