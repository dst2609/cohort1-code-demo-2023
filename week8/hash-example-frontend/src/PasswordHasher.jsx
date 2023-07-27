//Using bcrypt in the server side, sending the data to the backend using axios
import React, { useState } from "react";
import axios from "axios";

const PasswordHasher = () => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleHashPassword = async () => {
    try {
      const response = await axios.post("http://localhost:3000/hashPassword", {
        password,
      });
      const { hashedPassword } = response.data;
      setHashedPassword(hashedPassword);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  return (
    <div>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleHashPassword}>Hash Password</button>
      {hashedPassword && <p>Hashed Password: {hashedPassword}</p>}
    </div>
  );
};

export default PasswordHasher;

// // using bcrypt in the client side handleHashPassword
// import React, { useState } from "react";
// import bcrypt from "bcryptjs";

// const PasswordHasher = () => {
//   const [password, setPassword] = useState("");
//   const [hashedPassword, setHashedPassword] = useState("");

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleHashPassword = () => {
//     // Generate a salt (you can adjust the salt rounds, but 10 is a good balance between security and performance)
//     bcrypt.genSalt(5, function (err, salt) {
//       // Hash the password using the generated salt
//       bcrypt.hash(password, salt, function (err, hash) {
//         // Store the hashed password in the state
//         setHashedPassword(hash);
//       });
//     });
//   };

//   return (
//     <div>
//       <input type="text" value={password} onChange={handlePasswordChange} />
//       <button onClick={handleHashPassword}>Hash Password</button>
//       {hashedPassword && <p>Hashed Password: {hashedPassword}</p>}
//     </div>
//   );
// };

// export default PasswordHasher;
