import { Pool } from "pg";
import dotev from "dotenv";

dotev.config({
    path:"./backend/.env"
});
console.log(process.env);
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
});

export default pool;
