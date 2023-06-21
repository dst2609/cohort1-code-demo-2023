import React, { Children, useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [updateUserId, setUpdateUserId] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState("");

  useEffect(() => {
    //Fetch users from the backend API
    axios
      .get("http://localhost:3000")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddUser = () => {
    //Create new user

    if (newUserName.trim() !== "") {
      const newUser = { name: newUserName };

      axios
        .post("http://localhost:3000", newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          setNewUserName("");
        })
        .catch((error) => console.log(error));
    }
  };

  //Function to update the user
  const handleUpdateUser = (id, name) => {
    setUpdateUserId(id);
    setUpdatedUserName(name);
  };

  const handleSaveUpdate = () => {
    if (updatedUserName.trim() !== "") {
      axios
        .put(`http://localhost:3000/${updateUserId}`, {
          name: updatedUserName,
        })
        .then((response) => {
          if (response.status === 200) {
            setUpdateUserId("");
            setUpdatedUserName("");

            //Refresh
            axios
              .get("http://localhost:3000")
              .then((response) => setUsers(response.data))
              .catch((error) => console.log(error));
          } else {
            console.log("Updated failure");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  //handle handleDeleteUser
  const handleDeleteUser = (id) => {
    //Delete User
    axios
      .delete(`http://localhost:3000/${id}`)
      .then((response) => {
        if (response.status === 200) {
          //refresh
          axios
            .get("http://localhost:3000")
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));
        } else {
          console.log("Delete user failure");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        <input
          type="text"
          value={newUserName}
          onChange={(event) => setNewUserName(event.target.value)}
          placeholder="Enter new name"
        />

        <button onClick={handleAddUser}> Add new User</button>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleUpdateUser(user.id, user.name)}>
                {" "}
                Update
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>
                {" "}
                Delete User
              </button>
            </li>
          ))}
        </ul>

        {updateUserId && (
          <div>
            <input
              type="text"
              value={updatedUserName}
              onChange={(event) => setUpdatedUserName(event.target.value)}
              placeholder="Enter updated name"
            />

            <button onClick={handleSaveUpdate}> Save Updates </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
