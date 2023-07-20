import React, { useState, useEffect } from "react";
import TodoApp from "./screens/TodoApp";
import TodoLoginForm from "./screens/TodoLoginForm";
import TodoRegisterForm from "./screens/TodoRegisterForm";
import "./components/css/style.css";

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLoginError = () => {
    setIsAuthenticated(false);
    setToken(null);
    setLoginError(true);
  };

  const handleRegisterError = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRegisterError(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!isAuthenticated && !loginError) {
    return <TodoLoginForm token={token} onLogin={handleLogin} onLoginError={handleLoginError} />;
  } else if (!isAuthenticated && loginError) {
    return <TodoRegisterForm onRegisterError={handleRegisterError} />;
  } else if (!isAuthenticated && registerError) {
    return <TodoLoginForm token={token} onLogin={handleLogin} onLoginError={handleLoginError} />;
  } else {
    return <TodoApp token={token} onLogout={handleLogout} />;
  }
}

export default App;