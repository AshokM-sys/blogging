import dotenv from "dotenv";
import mysql from "mysql2";

// Load environment variables from the .env file
dotenv.config();

// Use DB_URL if available, otherwise use individual variables
const dbUrl = process.env.DB_URL;
let db;

if (dbUrl) {
  // If DB_URL is provided, parse it to extract the components
  const url = new URL(dbUrl);

  db = mysql.createConnection({
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.split('/')[1], // Extract database name from URL
    port: url.port,
  });
} else {
  // Fallback to using individual environment variables if DB_URL is not available
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export default db;
