require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/routes");
const { setupSecurity } = require("./security/security");

const app = express();

// Configure CORS options to allow access only from localhost:5173
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json());

app.use(morgan("dev"));

// Security setup
setupSecurity(app);

// Define the default GET route for "/"
app.get("/", (req, res) => {
  res.send("Hello, this is the Open-Ai-Api demo");
});

// Routes setup
routes(app);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
