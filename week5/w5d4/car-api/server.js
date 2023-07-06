const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan"); // Import the Morgan middleware for logging
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

// Middleware
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev")); // Use Morgan middleware with 'dev' format for request logging
app.use(express.json()); // Parse incoming requests with JSON payloads

// Routes
app.use("/api/auth", authRoutes);

// Retrieve all cars from the database
app.use("/api/cars", carRoutes);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
