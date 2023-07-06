import React from "react";
import { AiOutlineClear, AiOutlineCheck } from "react-icons/ai";

class TodoList extends React.Component {
  render() {
    return (
      <div>
        <ul className="todo-list">
          {this.props.items.map(
            (item) =>
              item.status === true && (
                <li
                  className={item.class}
                  key={item.id}
                >
                  {item.text}
                  <button
                    className="delete"
                    onClick={() => this.props.onClickDelete(item)}
                  >
                    <i></i>
                    <AiOutlineClear />
                  </button>
                  <button
                    className="soft"
                    onClick={() => this.props.onSoftDelete(item)}
                  >
                    <i></i>
                    <AiOutlineCheck />
                  </button>
                  <hr className="dashed"></hr>
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
}

export default TodoList;
