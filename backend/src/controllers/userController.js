import pool from "../db.config.js";

async function createUser(req, res) {
  const { email, password } = req.body;
  try {
    const result = await pool.query("INSERT INTO users (email,password) VALUES ($1,$2)", [
      email,
      password,
    ]);
    res.json(result);
  } catch (err) {}
}

export { createUser };
