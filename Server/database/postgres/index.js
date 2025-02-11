import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file

// Create a new Pool instance
const { Pool } = pg;
// Create a new Pool instance
const pool = new Pool({
  user: process.env.DB_USER, // Your Postgres user
  host: process.env.DB_HOST, // Your Postgres host
  database: process.env.DB_DATABASE, // Your Postgres database
  password: process.env.DB_PASSWORD, // Your Postgres password
  port: process.env.DB_PORT, // Your Postgres port
});

export default {
  query: (text, params) => pool.query(text, params),
};
