import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Post from "../components/Post";

const Feed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err)
      setError("Could not load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { content },
        { headers: { Authorization: token } }
      );
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error(err)
      setError("Could not create post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + id, {
        headers: { Authorization: token },
      });
      fetchPosts();
    } catch (err) {
      console.error(err)
      setError("Could not delete post");
    }
  };

  return (
    <div className="feed-container">
      <h2>Feed</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handlePost} className="post-form">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;