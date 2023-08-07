import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/slices/todoSlice.js";

function TodoForm({ token, todos }) {
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
      alert("Todo položka bola úspešne pridaná!");
      setText("");
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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