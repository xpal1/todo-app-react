import React from "react";
import TodoNavbar from "../components/TodoNavbar";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import "../components/css/style.css";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <div>
        <TodoNavbar />
        <h3 className="animate-character"> ToDo 's</h3>
        <div className="border-box">
          <div className="button-container">
            <TodoFilter
              filterActive={this.filterActive}
              filterDone={this.filterDone}
              filterAll={this.filterAll}
            />
            <TodoList
              items={this.state.items}
              hardDelete={this.hardDelete}
              softDelete={this.softDelete}
            />
            <TodoForm
              addTodo={this.addTodo}
              valueApp={this.state.value}
              status={this.state.status}
              length={this.state.items.length}
            />
          </div>
        </div>
      </div>
    );
  }

  addTodo = (newItem) => {
    this.setState((state) => {
      let items = state.items;
      items.push(newItem);

      return {
        items,
      };
    });
  };

  hardDelete = (item) => {
    this.setState((state) => {
      let items = state.items;
      items = items.filter((i) => i.id !== item.id);

      return {
        items,
      };
    });
  };

  softDelete = (item) => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return item.id ? (item.class = "done") : (item.class = "");
      });

      return {
        items,
      };
    });
  };

  filterAll = () => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return i.status !== true ? (i.status = true) : (i.status = true);
      });

      return {
        items,
      };
    });
  };

  filterActive = () => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return i.class === "done" ? (i.status = false) : (i.status = true);
      });

      return {
        items,
      };
    });
  };

  filterDone = () => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return i.class !== "done" ? (i.status = false) : (i.status = true);
      });

      return {
        items,
      };
    });
  };
}

export default TodoApp;
