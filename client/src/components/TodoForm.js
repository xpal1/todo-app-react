import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/slices/todoSlice.js";
import "./css/style.css";

function TodoForm({ token, todos }) {
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1200,
    pauseOnHover: false,
    closeOnClick: false,
    draggable: false,
    theme: "dark",
  };

  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.length) {
      return;
    }

    const newTodo = {
      text: text,
      completed: false,
      userId: userId,
    };

    const successCallback = () => {
      toast.success("Todo položka bola úspešne pridaná!", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Niečo sa nepodarilo!", toastOptions);
    };

    dispatch(addTodoAsync(newTodo, token, successCallback, errorCallback));

    setText("");
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
      <div>
        <form className="form-todos" onSubmit={handleSubmit}>
          <input
            className="todo-form-input"
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={handleChange}
            placeholder="New todo..."
          />
          <button type="submit" className="add-button">
            Add# {todos.length + 1}
          </button>
        </form>
        <ToastContainer />
      </div>
  );
}

export default TodoForm;