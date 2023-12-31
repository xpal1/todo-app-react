import React, { useState, useEffect } from "react";
import TodoNavbar from "../components/TodoNavbar";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectFilteredTodos, setToastShown } from "../redux/slices/todoSlice.js";
import TodoNotFound from "../components/TodoNotFound";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/css/style.css";

function TodoApp() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const todos = useSelector(selectFilteredTodos);
  const username = localStorage.getItem("username");
  const isToastShown = useSelector((state) => state.todo.isToastShown);

  const toastOptions = {
    position: "top-center",
    autoClose: false,
    pauseOnHover: false,
    closeOnClick: false,
    draggable: false,
    theme: "colored",
    hideProgressBar: true,
    transition: Slide,
    className: "welcome-toast",
    closeButton: false
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!isToastShown) {
      setTimeout(() => {
        toast("Vitajte, " + username + "!", toastOptions);
        dispatch(setToastShown(true));
      }, 1000);
    }
  }, []);

  return (
    <div>
      <ToastContainer limit={1} />
      <TodoNavbar />
      <h3 className="animate-character h3-nadpis"> ToDo 's</h3>
      <div className="border-box">
        <div className="button-container">
          <TodoFilter token={token} selectFilteredTodos={selectFilteredTodos} />
          {todos.length > 0 ? (
            <TodoList token={token} todos={todos} />
          ) : (
            <TodoNotFound />
          )}
          <TodoForm token={token} todos={todos} length={todos.length} />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;