import pool from "../db.config.js";

async function getProducts(req, res) {
  const getProducts = await pool.query("SELECT * FROM products");
  res.json(getProducts.rows);
}

export { getProducts };
