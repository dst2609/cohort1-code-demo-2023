//imports
const express = require("express");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db/pool");

// Registration route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Generate salt with desired cost factor
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [name, email, hashedPassword];
    const result = await pool.query(createUserQuery, values);

    // Generate and sign JWT token
    // const token = jwt.sign(
    //   { userId: result.rows[0].id, userName: result.rows[0].name },
    //   "your-secret-key",
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    res.status(201).json({
      message: "User registered successfully",
      // token: token,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUserQuery = `
      SELECT * FROM users
      WHERE email = $1
    `;

    const result = await pool.query(getUserQuery, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate and sign JWT token
    // const token = jwt.sign(
    //   { userId: user.id, userName: user.name },
    //   "secret-key",
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    res.status(200).json({
      message: "Login successful",
      // token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;

/**
 * OPTIONAL CODE:
 * // const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const pool = require("../db/pool");

// // Login route
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists in the database
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     const user = result.rows[0];

//     if (!user) {
//       res.status(401).json({ message: "Authentication failed" });
//       return;
//     }

//     // Compare the entered password with the stored hashed password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
//       // Passwords match, authentication successful
//       res.status(200).json({ message: "Login successful" });
//     } else {
//       // Passwords do not match, authentication failed
//       res.status(401).json({ message: "Authentication failed" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Register route
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert the user with the hashed password into the database
//     await pool.query(
//       "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;
 * 
 */
