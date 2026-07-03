const { Pool } = require("pg");
require("dotenv").config();

console.log("Password being used:", JSON.stringify(process.env.DB_PASSWORD));

// Create a connection pool to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Full error:", err);
  } else {
    console.log("Connected to PostgreSQL database!");
    release();
  }
});

module.exports = pool;