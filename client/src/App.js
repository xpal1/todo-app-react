import React from "react";
import TodoApp from "./screens/TodoApp";
import TodoLoginForm from "./screens/TodoLoginForm";
import TodoRegisterForm from "./screens/TodoRegisterForm";
import "./components/css/style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isRegistered: false
    };
  }

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  handleRegister = () => {
    this.setState({ isRegistered: true });
  }

  render() {
    const { isAuthenticated, isRegistered } = this.state;

    if (!isAuthenticated) {
      if (isRegistered) {
        return <TodoLoginForm onLogin={this.handleLogin} />;
      } else {
        return <TodoRegisterForm onRegister={this.handleRegister} />;
      }
    } else {
      return <TodoApp />;
    }
  }
}

export default App;
