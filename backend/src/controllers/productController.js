import pool from "../db.config.js";


async function getProducts(req, res) {
    const getProducts = await pool.query("SELECT * FROM products");
  res.json(products);
}
async function getOneProducts(req, res) {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );
  res.json(result.rows);
}
async function createProduct(req, res) {
  const { name, price, category } = req.body;
  const result = await pool.query(
    "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *",
    [name, price, category]
  );
  res.json(result.rows);
}
async function updateProduct(req, res) {
  const { id } = req.params;

  const { name, price, category } = req.body;
  const result = await pool.query(
    "UPDATE  products SET name=$1, price=$2, category=$3 WHERE id=$4  RETURNING *",
    [name, price, category, id]
  );
  res.json(result.rows);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM  products  WHERE id=$1  RETURNING *",
    [id]
  );
  res.json(result.rows);
}

async function CategoryStats(req, res) {
  const result = await pool.query(
    "SELECT category, COUNT(*), AVG(price) as Averagerice,MIN(price) as minPrise FROM products GROUP BY category"
  );
  res.json(result.rows);
}

export {
  getProducts,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  CategoryStats,
};
