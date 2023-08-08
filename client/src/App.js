import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoApp from "./screens/TodoApp";
import TodoLoginForm from "./screens/TodoLoginForm";
import TodoRegisterForm from "./screens/TodoRegisterForm";
import {
  selectUser,
  setToken,
  setLoginError,
  setRegisterError,
} from "./redux/slices/userSlice.js";
import "./components/css/style.css";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  const handleLogin = (token) => {
    dispatch(setToken(token));
    localStorage.setItem("token", token);
  };

  const handleLoginError = () => {
    dispatch(setLoginError(true));
  };

  const handleRegisterError = () => {
    dispatch(setRegisterError(true));
  };

  const handleLogout = () => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
  };

  return (
    <>
      <ToastProvider>
        {!user.token && (!user.loginError || user.registerError) ? (
          <TodoLoginForm
            onLogin={handleLogin}
            onLoginError={handleLoginError}
          />
        ) : !user.token && user.loginError ? (
          <TodoRegisterForm onRegisterError={handleRegisterError} />
        ) : (
          <TodoApp token={user.token} onLogout={handleLogout} />
        )}
      </ToastProvider>
    </>
  );
}

export default App;