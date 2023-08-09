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

export const addTodoAsync = (
  newTodo,
  token,
  successCallback,
  errorCallback
) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/todos/", newTodo, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(addTodo(newTodo, token));
    dispatch(fetchTodos(token));
    successCallback();
  } catch (error) {
    if (error.response) {
      errorCallback();
      console.log(error.response.data);
    } else {
      errorCallback();
      console.log(error);
    }
  }
};

export const hardDelete = (
  _id,
  token,
  successCallback,
  errorCallback
) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/todos/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchTodos(token));
    successCallback();
  } catch (error) {
    if (error.response) {
      errorCallback();
    } else {
      console.log(error);
      errorCallback();
    }
  }
};

export const softDelete = (
  _id,
  updatedTodo,
  token,
  successCallback,
  errorCallback
) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchTodos(token));
    successCallback();
  } catch (error) {
    if (error.response) {
      errorCallback();
    } else {
      console.log(error);
      errorCallback();
    }
  }
};

export const filterAll = (token, successCallback, errorCallback) => async (
  dispatch
) => {
  try {
    const response = await axios.get("http://localhost:5000/todos/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setFilteredTodos(response.data));
    successCallback();
  } catch (error) {
    console.error(error);
    errorCallback();
  }
};

export const filterActive = (token, successCallback, errorCallback) => async (
  dispatch
) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/todos?completed=false",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setFilteredTodos(response.data));
    successCallback();
  } catch (error) {
    console.error(error);
    errorCallback();
  }
};

export const filterDone = (token, successCallback, errorCallback) => async (
  dispatch
) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/todos?completed=true",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setFilteredTodos(response.data));
    successCallback();
  } catch (error) {
    console.error(error);
    errorCallback();
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