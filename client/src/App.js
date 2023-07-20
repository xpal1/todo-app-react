import React, { useState, useEffect } from "react";
import TodoApp from "./screens/TodoApp";
import TodoLoginForm from "./screens/TodoLoginForm";
import "./components/css/style.css";

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!isAuthenticated) {
    return <TodoLoginForm onLogin={handleLogin} />;
  } else {
    return <TodoApp token={token} onLogout={handleLogout} />;
  }
}

export default App;