import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/todos/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setFilteredTodos(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const addTodoAsync = (newTodo, token) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/todos/", newTodo, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(addTodo(newTodo, token));
    dispatch(fetchTodos(token));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(newTodo);
    } else {
      alert("Niečo sa nepodarilo!");
      console.log(error);
    }
  }
};

export const hardDelete = (_id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/todos/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTodos(token));
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

export const softDelete = (_id, updatedTodo, token) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTodos(token));
    alert("Todo položka bola úspešne aktualizovaná!");
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Niečo sa nepodarilo!");
      console.log(error);
    }
  }
};

export const filterAll = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/todos/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setFilteredTodos(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const filterActive = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/todos?completed=false",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setFilteredTodos(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const filterDone = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/todos?completed=true",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setFilteredTodos(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    filteredTodos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setFilteredTodos: (state, action) => {
      state.filteredTodos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});

export const { setTodos, setFilteredTodos, addTodo } = todoSlice.actions;

export const selectFilteredTodos = (state) => state.todo.filteredTodos;

export default todoSlice;