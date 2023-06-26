const express = require("express"); //Import the Express.js framework
const cors = require("cors"); // Import the CORS middleware
const morgan = require("morgan"); // Import the Morgan middleware for logging

const carsRoutes = require("./routes/cars"); // Import the cars router module

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev")); // Use Morgan middleware with 'dev' format for request logging
app.use(express.json()); // Parse incoming requests with JSON payloads

//Mount the cars router at the '/api/cars'
app.use("/api/cars", carsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
