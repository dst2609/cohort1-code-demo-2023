import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState();

  useEffect(() => {
    const checkLoggedIn = () => {
      //check if the user is logged in when the user first accesses the webapp
      const token = localStorage.getItem("token");
      if (token) {
        //decode the stored token
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);

        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          //Token has expired, log out the user
          handleLogout();
        }
      }
    };

    checkLoggedIn();
  }, []);

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

      if (response.status === 200) {
        // const { token } = response.data;
        const { token } = data;
        localStorage.setItem("token", token);

        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(data.message); //optional - display a success message
        console.log(data.user.name); //another way to get the username

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUserName(decodedToken.userName);
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

      if (response.status === 201) {
        //get the token information and store in localStorage
        const { token } = data;
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUserName(decodedToken.userName);

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
    //remove the stored token and setLoggedIn as false
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <h1>Welcome! You are logged in!!</h1>
          <h5>Welcome {userName}</h5>
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
