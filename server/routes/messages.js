const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messagesController");
const protect = require("../middleware/auth");

// Send a message → POST /api/messages (protected)
router.post("/", protect, sendMessage);

// Get messages between two users → GET /api/messages/:receiver_id (protected)
router.get("/:receiver_id", protect, getMessages);

module.exports = router;