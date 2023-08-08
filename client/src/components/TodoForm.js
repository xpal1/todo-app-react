import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/slices/todoSlice.js";
import "./css/style.css";

function TodoForm({ token, todos }) {
  // const { addToast } = useToasts();
  const dispatch = useDispatch();

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

    dispatch(addTodoAsync(newTodo, token));
    // addToast("Todo položka bola úspešne pridaná!", {
    //   appearance: "success",
    //   autoDismiss: true,
    //   autoDismissTimeout: 2000,
    //   placement: "top-right",
    //   className: "todo-toast"
    // });
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
      </div>
  );
}

export default TodoForm;