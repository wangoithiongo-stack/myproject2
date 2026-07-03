import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { token } = useAuth();
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/messages/" + receiverId,
        { headers: { Authorization: token } }
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not load messages");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        { receiver_id: receiverId, content },
        { headers: { Authorization: token } }
      );
      setContent("");
      fetchMessages();
    } catch (err) {
      console.error(err);
      setError("Could not send message");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      {error && <p className="error">{error}</p>}

      <div className="receiver-input">
        <input
          type="number"
          placeholder="Enter user ID to chat with"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <button onClick={fetchMessages}>Load Messages</button>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p>No messages yet. Start a conversation!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <strong>{msg.sender}</strong>
              <p>{msg.content}</p>
              <span>{new Date(msg.created_at).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;