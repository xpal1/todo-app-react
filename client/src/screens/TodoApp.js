import React, { useEffect } from "react";
import TodoNavbar from "../components/TodoNavbar";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectFilteredTodos } from "../redux/slices/todoSlice.js";
import TodoNotFound from "../components/TodoNotFound";
import "../components/css/style.css";

function TodoApp() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const todos = useSelector(selectFilteredTodos);

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <TodoNavbar />
        <h3 className="animate-character h3-nadpis"> ToDo 's</h3>
        <div className="border-box">
          <div className="button-container">
            <TodoFilter
              token={token}
              selectFilteredTodos={selectFilteredTodos}
            />
            {todos.length > 0 ? (
              <TodoList token={token} todos={todos} />
            ) : (
              <TodoNotFound />
            )}
            <TodoForm token={token} todos={todos} length={todos.length} />
          </div>
        </div>
    </div>
  );
}

export default TodoApp;