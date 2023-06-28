import React, { Children, useState } from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(data.message); //optional - display a success message
      } else {
        //Login failed
        setLoginError(data.message);
        console.log(data.message); //optional - display error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Registration function to handle registration
  const handleRegistration = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      //wait for the response
      const data = await response.json();

      if (response.ok) {
        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
      } else {
        //REgistration failed
        console.log(data.message); //optional - display error meesage
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <h1>Welcome! You are logged in!!</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <h2>Welcome! </h2>
          <LoginForm onLogin={handleLogin} error={loginError} />
          <RegistrationForm onRegister={handleRegistration} />
        </div>
      )}
    </div>
  );
};

export default App;
