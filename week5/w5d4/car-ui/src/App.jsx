import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import NewCars from "./Components/NewCars/NewCars";
import UsedCars from "./Components/UsedCars/UsedCars";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);
        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          // Token has expired, log out the user
          handleLogout();
        }
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        Cookies.set("token", token); // Set the token as a cookie
        setLoggedIn(true);
        setLoginError("");
        console.log(response.data.message); // Optional: Display a success message
        setUserName(response.data.user.name);
      } else {
        setLoginError(response.data.message);
        console.log(response.data.message); // Optional: Display an error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegistration = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 201) {
        const { token } = response.data;
        Cookies.set("token", token); // Set the token as a cookie
        setLoggedIn(true);
        setLoginError("");
        console.log(response.data.message);
        setUserName(response.data.user.name);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token cookie
    setLoggedIn(false);
    setUserName("");
    window.location.href = "/"; // Redirect to the home route
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Home
              </Link>
            </li>
            {loggedIn && (
              <>
                <li className="navbar-item">
                  <Link to="/newcars" className="navbar-link">
                    New Cars
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/usedcars" className="navbar-link">
                    Used Cars
                  </Link>
                </li>
                <li className="navbar-item">
                  <span className="username">Logged in as: {userName}</span>
                </li>
                <li className="navbar-item">
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <div className="home">
                  <h1>Welcome to DT's Car Dealership</h1>
                </div>
              ) : (
                <div className="login-registration">
                  <LoginForm onLogin={handleLogin} error={loginError} />
                  <RegistrationForm onRegister={handleRegistration} />
                </div>
              )
            }
          />
          {loggedIn && (
            <>
              <Route path="/newcars" element={<NewCars />} />
              <Route path="/usedcars" element={<UsedCars />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

/**
 *
 * Optional - Using localStorage
 */

// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loginError, setLoginError] = useState("");
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const checkLoggedIn = () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const decodedToken = jwtDecode(token);
//         setUserName(decodedToken.userName);
//         if (decodedToken.exp * 1000 > Date.now()) {
//           setLoggedIn(true);
//         } else {
//           // Token has expired, log out the user
//           handleLogout();
//         }
//       }
//     };

//     checkLoggedIn();
//   }, []);

//   const handleLogin = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.status === 200) {
//         const { token } = response.data;
//         localStorage.setItem("token", token);
//         setLoggedIn(true);
//         setLoginError("");
//         console.log(response.data.message); // Optional: Display a success message
//         setUserName(response.data.user.name);
//       } else {
//         setLoginError(response.data.message);
//         console.log(response.data.message); // Optional: Display an error message
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleRegistration = async (name, email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/auth/register",
//         {
//           name,
//           email,
//           password,
//         }
//       );
//       if (response.status === 201) {
//         const { token } = response.data;
//         localStorage.setItem("token", token);
//         setLoggedIn(true);
//         setLoginError("");
//         console.log(response.data.message);
//         setUserName(response.data.user.name);
//       } else {
//         console.log(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     setUserName("");
//     window.location.href = "/"; // Redirect to the home route
//   };
