import express from "express";
import mysql, { createConnection } from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import signupRoutes from "./routes/signupRoutes.js"; // If using ES6 imports
import postRoutes from './routes/postRoutes.js'

const app = express();

// CORS middleware
app.use(
  cors({
    origin: "https://blogging-2-7onm.onrender.com",  // Replace with your actual frontend URL (Render URL)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/uploads', express.static('uploads'));

// Body parser for JSON data
app.use(bodyParser.json());

// Handle preflight OPTIONS requests
app.options("*", cors());

app.use("/", signupRoutes);
app.use('/api', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
