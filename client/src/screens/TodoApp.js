import React from "react";
import TodoNavbar from "../components/TodoNavbar";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import axios from "axios";
import "../components/css/style.css";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      todos: [],
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      this.setState({ todos: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  addTodoToList = async (newTodo) => {
    try {
      await axios.post("http://localhost:5000/todos", newTodo);
      this.props.fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

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
              todos={this.state.todos}
              hardDelete={this.hardDelete}
              softDelete={this.softDelete}
            />
            <TodoForm
              addTodoToList={this.addTodoToList}
              fetchTodos={this.fetchTodos}
              valueApp={this.state.value}
              status={this.state.status}
              length={this.state.todos.length}
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
