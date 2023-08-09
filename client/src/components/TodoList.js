import React from "react";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hardDelete, softDelete } from "../redux/slices/todoSlice.js";
import "./css/style.css";

function TodoList({ token, todos }) {
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1200,
    pauseOnHover: false,
    closeOnClick: false,
    draggable: false,
    theme: "dark",
    transition: Zoom,
  };

  const handleHardDelete = async (_id) => {

    const successCallback = () => {
      toast.success("Todo položka bola úspešne odstránená!", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Niečo sa nepodarilo!", toastOptions);
    };

    dispatch(hardDelete(_id, token, successCallback, errorCallback));
  };

  const handleSoftDelete = async (_id, updatedTodo) => {

    const successCallback = () => {
      toast.success("Todo položka bola úspešne aktualizovaná!", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Niečo sa nepodarilo!", toastOptions);
    };

    dispatch(softDelete(_id, { ...updatedTodo }, token, successCallback, errorCallback));
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
      <ToastContainer />
    </div>
  );
}

export default TodoList;