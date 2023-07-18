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
      todos: [],
      loading: true,
      filteredTodos: [],
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      this.setState({ todos: response.data, loading: false });
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

  hardDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${_id}`);
      this.fetchTodos();
      alert("Todo položka bola úspešne odstránená!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Niečo sa nepodarilo!");
        console.log(error);
      }
    }
  };

  softDelete = async (_id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo);
      this.fetchTodos();
      alert("Todo položka bola úspešne aktualizovaná!");
      console.log(updatedTodo);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Niečo sa nepodarilo!");
        console.log(error);
      }
    }
  };

  setFilteredTodos = (filteredTodos) => {
    this.setState({ filteredTodos });
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
              setFilteredTodos={this.setFilteredTodos}
            />
            <TodoList
              todos={this.state.filteredTodos}
              fetchTodos={this.fetchTodos}
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
}

export default TodoApp;