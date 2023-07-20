import React from "react";
import "./css/style.css";

function TodoNavbar(props) {
  const username = localStorage.getItem("username");

  const logoutFunction = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/";
  };

  const redirectToLoginForm = () => {
    window.location.href = "http://localhost:3000/prihlasenie";
  };

  const redirectToRegisterForm = () => {
    window.location.href = "http://localhost:3000/registracia";
  };

  return (
    <div>
      <div className="navbar">
        <ul className="navbar-li">
          <li>
            <p className="username-navbar">{username}</p>
            <button className="home-btn" onClick={logoutFunction}>
              Logout
            </button>
            <button className="login-btn" onClick={redirectToLoginForm}>
              Login
            </button>
            <button className="login-btn" onClick={redirectToRegisterForm}>
              Register
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TodoNavbar;