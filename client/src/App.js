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
    };
  }

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    const { isAuthenticated } = this.state;

    // console.log(isAuthenticated);

    if (!isAuthenticated) {
      return <TodoLoginForm onLogin={this.handleLogin} />;
    } else if (isAuthenticated) {
      return <TodoApp />;
    } else {
      return <TodoRegisterForm />;
    }
  }
}

export default App;
