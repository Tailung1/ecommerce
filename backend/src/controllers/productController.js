// import pool from "../db.config.js";
import prisma from "../../prisma/prismClient.js";

async function createProduct(req, res) {
  try {
    const { name, description, price, stock, image_url } = req.body;
    const productData = req.body;
    // const { name, description, price, stock, imageUrl } = req.body;
    // const result = await pool.query(
    //   // Placeholders keep data separate from SQL code, preventing SQL injection.
    //   "INSERT INTO products (name, description, price, stock, image_url) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    //   [name, description, price, stock, image_url]
    // );
    // res.status(201s).json(result.rows[0]);
    const result = await prisma.product.create({
      data: { name, description, price, stock, imageUrl: image_url },
    });
    res.status(201).json({ message: "Product created successfully", createdProduct: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getProduct(req, res) {
  console.log("came");
  try {
    // await pool.query("SELECT * FROM products");
    const data = await prisma.product.findMany({});
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { createProduct, getProduct };
