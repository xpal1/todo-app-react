import React from "react";
import TodoApp from "./screens/TodoApp";
import TodoLoginForm from "./screens/TodoLoginForm";
import "./components/css/style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuthenticated: true, token: token });
    }
  }

  handleLogin = (token) => {
    this.setState({ isAuthenticated: true, token: token });
    localStorage.setItem("token", token);
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false, token: null });
    localStorage.removeItem("token");
  };

  render() {
    const { isAuthenticated, token } = this.state;

    if (!isAuthenticated) {
      return <TodoLoginForm onLogin={this.handleLogin} />;
    } else {
      return <TodoApp token={token} onLogout={this.handleLogout} />;
    }
  }
}

export default App;