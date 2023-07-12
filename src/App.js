import React from "react";
import TodoApp from "./components/TodoApp";
import TodoLoginForm from "./components/TodoLoginForm";
import TodoRegisterForm from "./components/TodoRegisterForm";
import "./components/css/style.css";

class App extends React.Component {
  state = {
    isAuthenticated: false,
    currentPath: window.location.pathname
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true }, () => {
      this.handlePathChange("/todos");
    });
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false }, () => {
      this.handlePathChange("/prihlasenie");
    });
  };

  handlePathChange = (path) => {
    this.setState({ currentPath: path });
    window.history.pushState(null, "", path);
  };

  componentDidMount() {
    const { currentPath } = this.state;

    if (currentPath === "/todos") {
      this.handleLogin();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAuthenticated } = this.state;
    if (!prevState.isAuthenticated && isAuthenticated) {
      this.handlePathChange("/todos");
    }
    if (prevState.isAuthenticated && !isAuthenticated) {
      this.handlePathChange("/prihlasenie");
    }
  }

  render() {
    const { isAuthenticated, currentPath } = this.state;

    if (!isAuthenticated) {
      if (currentPath === "/prihlasenie") {
        return <TodoLoginForm onLogin={this.handleLogin} />;
      } else if (currentPath === "/registracia") {
        return <TodoRegisterForm onLogin={this.handleLogin} />;
      } else {
        this.handlePathChange("/prihlasenie");
        return null;
      }
    } else {
      if (currentPath === "/todos") {
        return <TodoApp onLogout={this.handleLogout} />;
      } else {
        this.handlePathChange("/todos");
        return null;
      }
    }
  }
}

export default App;