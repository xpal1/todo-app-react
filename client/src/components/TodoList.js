import React from "react";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { hardDelete, softDelete } from "../redux/slices/todoSlice.js";

function TodoList({ token, todos }) {
  const dispatch = useDispatch();

  const handleHardDelete = (_id) => {
    dispatch(hardDelete(_id, token));
  };

  const handleSoftDelete = (_id, updatedTodo) => {
    dispatch(softDelete(_id, { ...updatedTodo }, token));
    console.log(updatedTodo);
  };

  return (
    <div>
      <ul className="todo-list">
        {todos.length > 0 &&
          todos.map((todo, index) => (
            <li key={index}>
              {todo.text}
              <button
                className="delete"
                onClick={() => handleHardDelete(todo._id)}
              >
                <AiOutlineClear />
              </button>
              <button
                className="soft"
                onClick={() => handleSoftDelete(todo._id, { completed: true })}
              >
                <AiOutlineCheck />
              </button>
              <hr className="dashed"></hr>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TodoList;