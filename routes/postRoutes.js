// postRoutes.js
import express from 'express';
import { createPost, getPostById, getAllPosts, updatePost, deletePost, PostDetails } from '../controllers/postController.js'; 
import { authenticateUser } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/posts", authenticateUser, createPost);  

router.get("/posts", authenticateUser, getPostById);  

router.get("/allposts", getAllPosts);

router.get("/posts/:id", PostDetails); 

router.put("/posts/:id", authenticateUser, updatePost); 

// Delete a post
router.delete("/posts/:id", authenticateUser, deletePost);  // Delete post - corrected endpoint

export default router;
