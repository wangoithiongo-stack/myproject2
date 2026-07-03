const express = require("express");
const cors = require("cors");
const http = require("http");
const db = require("./db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const messageRoutes = require("./routes/messages");

const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Posts routes
app.use("/api/posts", postRoutes);

// Messages routes
app.use("/api/messages", messageRoutes);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});