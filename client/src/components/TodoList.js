import React from "react";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";

function TodoList(props) {
  return (
    <div>
      <ul className="todo-list">
        {props.todos.length > 0 &&
          props.todos.map((todo, index) => (
            <li className={todo.class} key={index}>
              {todo.text}
              <button
                className="delete"
                onClick={() => props.hardDelete(todo._id)}
              >
                <AiOutlineClear />
              </button>
              <button
                className="soft"
                onClick={() =>
                  props.softDelete(todo._id, { completed: true })
                }
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