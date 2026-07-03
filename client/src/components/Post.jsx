import { useAuth } from "../context/AuthContext";

const Post = ({ post, onDelete }) => {
  const { user } = useAuth();

  return (
    <div className="post-card">
      <div className="post-header">
        <strong>{post.username}</strong>
        <span>{new Date(post.created_at).toLocaleString()}</span>
      </div>
      <p>{post.content}</p>
      {user && user.username === post.username && (
        <button onClick={() => onDelete(post.id)} className="delete-btn">
          Delete
        </button>
      )}
    </div>
  );
};

export default Post;