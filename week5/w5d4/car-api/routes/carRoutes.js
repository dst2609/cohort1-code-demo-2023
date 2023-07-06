const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db/pool");

// Get all cars from the database
router.get("/", async (req, res) => {
  // Set cache-control header to disable caching (optional-advanced)
  res.setHeader("Cache-Control", "no-cache");
  try {
    const query = "SELECT * FROM cars";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new car to the database
router.post("/", async (req, res) => {
  try {
    const { brand, model, year, is_new } = req.body;

    const query =
      "INSERT INTO cars (brand, model, year, is_new) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [brand, model, year, is_new];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
