const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan"); // Import the Morgan middleware for logging

const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev")); // Use Morgan middleware with 'dev' format for request logging
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use("/api/auth", authRoutes);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
