import React, { useRef, useState } from "react";
import axios from "axios";

function TodoForm(props) {
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const myRef = useRef(null);

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

    try {
      const { token } = props;
      await axios.post("http://localhost:5000/todos/", newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      props.fetchTodos();
      setText("");

      alert("Todo položka bola úspešne pridaná!");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(newTodo);
      } else {
        alert("Niečo sa nepodarilo!");
        console.log(error);
      }
    }
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
          ref={myRef}
          id="text"
          value={text}
          onChange={handleChange}
          placeholder="New todo..."
        />
        <button type="submit" className="add-button">
          Add# {props.length + 1}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;