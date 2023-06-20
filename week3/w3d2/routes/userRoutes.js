const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

//Home screen
router.get("/", (request, response) => {
  const users = userModel.getAllUsers();
  response.json(users);
});

//Users - Get all users
router.get("/users", (request, response) => {
  const users = userModel.getAllUsers();
  response.json(users);
});

//Add a new user
router.post("/", (request, response) => {
  const { name } = request.body;
  const newUser = userModel.addUser(name);
  response.json(newUser);
});

//Update a user by ID
router.put("/:id", (request, response) => {
  const userId = parseInt(request.params.id);
  const { name } = request.body;

  const updatedUser = userModel.updateUser(userId, name);

  if (updatedUser) {
    response.json(updatedUser);
  } else {
    response.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
