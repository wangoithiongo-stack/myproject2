const express = require("express");
const router = express.Router();
const { createPost, getPosts, deletePost } = require("../controllers/postsController");
const protect = require("../middleware/auth");

// Get all posts → GET /api/posts (public)
router.get("/", getPosts);

// Create a post → POST /api/posts (protected)
router.post("/", protect, createPost);

// Delete a post → DELETE /api/posts/:id (protected)
router.delete("/:id", protect, deletePost);

module.exports = router;