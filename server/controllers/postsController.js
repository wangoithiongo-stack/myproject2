const pool = require("../db");

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;

  try {
    const newPost = await pool.query(
      "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
      [user_id, content]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await pool.query(
      `SELECT posts.id, posts.content, posts.created_at, 
       users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       ORDER BY posts.created_at DESC`
    );

    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    // Make sure the post belongs to the user
    const post = await pool.query(
      "SELECT * FROM posts WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );

    if (post.rows.length === 0) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPost, getPosts, deletePost };