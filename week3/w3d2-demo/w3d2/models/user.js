let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Devarsh T" },
  { id: 3, name: "Jane Smith" },
];

//Get all users
const getAllUsers = () => {
  return users;
};

//Get a user by ID
const getUserByID = (id) => {
  return users.find((user) => user.id === id);
};

// Add a new user
const addUser = (name) => {
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  return newUser;
};

//Update user by ID
const updateUser = (id, name) => {
  const user = users.find((user) => user.id === id); //or call getUserById
  if (user) {
    user.name = name;
    return user;
  }
  return null;
};

//Delete a user by ID
const deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    return deletedUser;
  }
  return null;
};

module.exports = {
  getAllUsers,
  addUser,
  getUserByID,
  updateUser,
  deleteUser,
};
