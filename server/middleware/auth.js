const jwt = require("jsonwebtoken");
require("dotenv").config();

// This middleware protects routes that require login
const protect = (req, res, next) => {
  // Get token from request headers
  const authHeader = req.header("Authorization");

  console.log("Token received:", authHeader);

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    // Attach the user id to the request
    req.user = decoded;

    // Move on to the next function
    next();
  } catch (err) {
    console.error("Token error:", err.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = protect;