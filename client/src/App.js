import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TodoApp from "./screens/TodoApp";
import TodoLoginForm from "./screens/TodoLoginForm";
import TodoRegisterForm from "./screens/TodoRegisterForm";
import {
  selectUser,
  setToken,
  setLoginError,
  setRegisterError,
  setRegisterSuccess,
} from "./redux/slices/userSlice.js";
import "./components/css/style.css";

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

  const handleRegisterSuccess = () => {
    dispatch(setRegisterSuccess(true));
  };

  const handleLogout = () => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
  };

  return (
    <>
      <Routes>
        {!user.token &&
        (!user.loginError || user.registerError || user.registerSuccess) ? (
          <Route
            exact
            path="/*"
            element={
              <TodoLoginForm
                onLogin={handleLogin}
                onLoginError={handleLoginError}
              />
            }
          />
        ) : !user.token && user.loginError ? (
          <Route
            exact
            path="/*"
            element={
              <TodoRegisterForm
                onRegisterSuccess={handleRegisterSuccess}
                onRegisterError={handleRegisterError}
              />
            }
          />
        ) : (
          <Route
            exact
            path="/*"
            element={<TodoApp token={user.token} onLogout={handleLogout} />}
          />
        )}
      </Routes>
    </>
  );
}

export default App;