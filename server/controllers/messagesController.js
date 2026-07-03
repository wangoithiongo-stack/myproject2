const pool = require("../db");

// Send a message
const sendMessage = async (req, res) => {
  const { receiver_id, content } = req.body;
  const sender_id = req.user.id;

  try {
    const newMessage = await pool.query(
      "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *",
      [sender_id, receiver_id, content]
    );

    res.status(201).json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all messages between two users
const getMessages = async (req, res) => {
  const { receiver_id } = req.params;
  const sender_id = req.user.id;

  try {
    const messages = await pool.query(
      `SELECT messages.id, messages.content, messages.created_at,
       sender.username AS sender, receiver.username AS receiver
       FROM messages
       JOIN users AS sender ON messages.sender_id = sender.id
       JOIN users AS receiver ON messages.receiver_id = receiver.id
       WHERE (messages.sender_id = $1 AND messages.receiver_id = $2)
       OR (messages.sender_id = $2 AND messages.receiver_id = $1)
       ORDER BY messages.created_at ASC`,
      [sender_id, receiver_id]
    );

    res.json(messages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage, getMessages };