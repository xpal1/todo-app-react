import React from "react";
import "../components/css/style.css";

class TodoNavbar extends React.Component {
  render() {
    const redirectToLoginForm = () => {
      window.location.href = "http://localhost:3000/prihlasenie";
    };

    const redirectToRegisterForm = () => {
      window.location.href = "http://localhost:3000/registracia";
    };

    const redirectToHome = () => {
      window.location.href = "http://localhost:3000";
    };
    return (
      <div>
        <div className="navbar">
          <ul className="navbar-li">
            <li>
              <button className="home-btn" onClick={redirectToHome}>
                Home
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
}

export default TodoNavbar;
