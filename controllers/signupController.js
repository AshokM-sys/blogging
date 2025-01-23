import express from "express";
import mysql, { createConnection } from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

// Instead of 'exports', use 'export'
export const signupController = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    // Insert the user into the database
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Error inserting user" });
        }
        return res.status(201).json({ message: "User created successfully" });
      }
    );
  });
};

export const loginController = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both username and password are required" });
  }

  // Find the user by username
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error querying the database" });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const user = results[0];

      // Compare the password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing password" });
        }

        if (!isMatch) {
          return res
            .status(400)
            .json({ error: "Invalid username or password" });
        }

        // If the passwords match, create a JWT token
        const token = jwt.sign(
          { userId: user.id, username: user.username }, // Make sure to include userId here
          process.env.JWT_SECRET, // Use JWT secret from .env
          { expiresIn: "1h" } // Set token expiration (e.g., 1 hour)
        );

        return res.json({
          successMessage: "Login successful",
          token,
        });
      });
    }
  );
};
