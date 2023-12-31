import React from "react";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";

class TodoList extends React.Component {
  render() {
    return (
      <div>
        <ul className="todo-list">
          {this.props.todos.length > 0 &&
            this.props.todos.map((todo, index) => (
              <li className={todo.class} key={index}>
                {todo.text}
                <button
                  className="delete"
                  onClick={() => this.props.hardDelete(todo._id)}
                >
                  <AiOutlineClear />
                </button>
                <button
                  className="soft"
                  onClick={() =>
                    this.props.softDelete(todo._id, { completed: true })
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
}

export default TodoList;