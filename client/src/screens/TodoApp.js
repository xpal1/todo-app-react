import React, { useEffect, useState } from "react";
import TodoNavbar from "../components/TodoNavbar";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import axios from "axios";
import "../components/css/style.css";

function TodoApp(props) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const { token } = props;
      const response = await axios.get("http://localhost:5000/todos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const hardDelete = async (_id) => {
    try {
      const { token } = props;
      await axios.delete(`http://localhost:5000/todos/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
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

  const softDelete = async (_id, updatedTodo) => {
    try {
      const { token } = props;
      await axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
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

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div>
      <TodoNavbar />
      <h3 className="animate-character h3-nadpis"> ToDo 's</h3>
      <div className="border-box">
        <div className="button-container">
          <TodoFilter token={props.token} setFilteredTodos={setFilteredTodos} />
          <TodoList
            todos={filteredTodos}
            fetchTodos={fetchTodos}
            hardDelete={hardDelete}
            softDelete={softDelete}
          />
          <TodoForm
            token={props.token}
            fetchTodos={fetchTodos}
            valueApp={props.value}
            status={props.status}
            length={todos.length}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;