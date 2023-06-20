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

//other functions

module.exports = {
  getAllUsers,
  addUser,
  getUserByID,
  updateUser,
  //other functioner
};
