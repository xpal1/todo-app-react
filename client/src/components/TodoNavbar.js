import React from "react";
import "./css/style.css";

class TodoNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("isAuthenticated", true),
      username: localStorage.getItem("username"),
    };
  }

  logoutFunction = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/";
  };

  redirectToLoginForm = () => {
    window.location.href = "http://localhost:3000/prihlasenie";
  };

  redirectToRegisterForm = () => {
    window.location.href = "http://localhost:3000/registracia";
  };

  render() {
    return (
      <div>
        <div className="navbar">
          <ul className="navbar-li">
            <li>
              {this.state.isAuthenticated && (
                <p className="username-navbar">Vitaj, {this.state.username}</p>
              )}
              <button className="home-btn" onClick={this.logoutFunction}>
                Logout
              </button>
              <button className="login-btn" onClick={this.redirectToLoginForm}>
                Login
              </button>
              <button
                className="login-btn"
                onClick={this.redirectToRegisterForm}
              >
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