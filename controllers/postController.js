import db from "../db/db.js";
import multer from 'multer';
import path from 'path';
import express from 'express';

export const PostDetails = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result[0]); 
  });
};

export const getAllPosts = (req, res) => {
  const query = "SELECT * FROM posts"; // Get all posts from the posts table

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ message: "Failed to fetch posts" });
    }

    res.status(200).json(results); // Send all posts to the client
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for storing files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique timestamp for filenames
  },
});

// Initialize multer upload middleware for handling a single image
const upload = multer({ storage: storage }).single('image'); // Use .single('image') for a single file upload

// Create post API (with image handling)
export const createPost = (req, res) => {
  // Use multer middleware to handle image upload first
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading image' });
    }

    const { title, content } = req.body;
    const userId = req.user.userId; // Assuming user ID is attached to the req object after JWT authentication

    // Validate the presence of title and content
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path; // If a file was uploaded, get its path
    }

    // Create the new post with title, content, userId, and imagePath
    const query = 'INSERT INTO posts (title, content, user_id, image) VALUES (?, ?, ?, ?)';
    db.query(query, [title, content, userId, imagePath], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating post' });
      }

      return res.status(201).json({ successMessage: 'Post created successfully' });
    });
  });
};

export const getPostById = (req, res) => {
  const user_id = req.user.userId; // Get the logged-in user's ID

  const query = "SELECT * FROM posts WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ message: "Failed to fetch posts" });
    }

    res.status(200).json(results); // Send only posts created by the logged-in user
  });
};

// Update a specific post
export const updatePost = (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Post not found or not authorized to update" });
      }
      res.status(200).json({ message: "Post updated successfully" });
    }
  );
};

// Delete a post
export const deletePost = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.query("DELETE FROM posts WHERE id = ?", [id, userId], (err, result) => {
    if (err || result.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "Error deleting post or not authorized" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  });
};
