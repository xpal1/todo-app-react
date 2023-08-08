import React from "react";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { hardDelete, softDelete } from "../redux/slices/todoSlice.js";
import "./css/style.css";

function TodoList({ token, todos }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const handleHardDelete = async (_id) => {
    dispatch(hardDelete(_id, token));
    addToast("Todo položka bola úspešne odstránená!", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
      placement: "top-right",
      className: "todo-toast"
    });
  };

  const handleSoftDelete = async (_id, updatedTodo) => {
    dispatch(softDelete(_id, { ...updatedTodo }, token));
    addToast("Todo položka bola úspešne aktualizovaná!", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
      placement: "top-right",
      className: "todo-toast"
    });
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