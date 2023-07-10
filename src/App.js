import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import TodoLoginForm from "./components/TodoLoginForm";
import TodoRegisterForm from "./components/TodoRegisterForm";
import "./components/css/style.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" index element={<TodoApp />} />
            <Route path="/prihlasenie" element={<TodoLoginForm />} />
            <Route path="/registracia" element={<TodoRegisterForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
