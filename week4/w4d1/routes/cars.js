const express = require("express");
const router = express.Router();

const db = require("../config/db");

//Get all the cars
router.get("/", (req, res) => {
  db.query("SELECT * FROM cars", (err, result) => {
    if (err) {
      console.error("Error retrieving cars: ", err);
      res.status(500).json({
        error: "An error occured while retrieving cars. Internal server error",
      });
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;
