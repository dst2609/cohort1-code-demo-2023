const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

app.use(cors("http://localhost:5173/")); // Enable CORS for all routes

app.use(express.json());

// Route to handle password hashing
app.post("/hashPassword", (req, res) => {
  const { password } = req.body;

  // Generate a salt (you can adjust the salt rounds, but 10 is a good balance between security and performance)
  bcrypt.genSalt(10, function (err, salt) {
    // Hash the password using the generated salt
    bcrypt.hash(password, salt, function (err, hash) {
      // Return the hashed password as the response
      res.json({ hashedPassword: hash });
    });
  });
});

// Your other routes and middleware...

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
