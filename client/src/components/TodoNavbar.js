import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/style.css";

class TodoNavbar extends React.Component {
  state = {
    isAuthenticated: false,
    username: "",
  };

  // componentDidMount() {
  //   const email = localStorage.getItem("email");
  //   if (email) {
  //     this.setState({ isAuthenticated: true, email });
  //   }
  // }

  logoutFunction = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/prihlasenie";
  };

  redirectToLoginForm = () => {
    window.location.href = "http://localhost:3000/prihlasenie";
  };

  redirectToRegisterForm = () => {
    window.location.href = "http://localhost:3000/registracia";
  };

  redirectToHome = () => {
    const { navigate } = this.props;
    if (this.state.isAuthenticated) {
      navigate("/todos");
    }
  };

  render() {
    const { isAuthenticated, username } = this.state;
    console.log(username);
    return (
      <div>
        <div className="navbar">
          <ul className="navbar-li">
            <li>
              {isAuthenticated && <span className="username">niečo</span>}
              <button className="home-btn" onClick={this.logoutFunction}>
                Logout
              </button>
              <button className="home-btn" onClick={this.redirectToHome}>
                Home
              </button>
              {!isAuthenticated && (
                <>
                  <button
                    className="login-btn"
                    onClick={this.redirectToLoginForm}
                  >
                    Login
                  </button>
                  <button
                    className="login-btn"
                    onClick={this.redirectToRegisterForm}
                  >
                    Register
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default function TodoNavbarWrapper(props) {
  const navigate = useNavigate();

  return <TodoNavbar {...props} navigate={navigate} />
}
