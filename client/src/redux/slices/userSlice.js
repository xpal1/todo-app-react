import { createSlice } from "@reduxjs/toolkit";
import { navigate } from "@gatsbyjs/reach-router";
import axios from "axios";

export const loginUser = (username, password, successCallback, errorCallback) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      username,
      password,
    });

    if (response.data.userId) {
      dispatch(setToken(response.data.token));
      dispatch(setUserId(response.data.userId));
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", username);
      localStorage.setItem("token", response.data.token);
      navigate("/todos");
      successCallback();
    }
  } catch (error) {
    dispatch(setLoginError(true));
    navigate("/registracia");
    errorCallback();
  }
};

export const registerUser = (username, email, password, successCallback, errorCallback) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/user/register", {
      username,
      email,
      password,
    });

    if (response.data.userObject) {
      navigate("/prihlasenie");
      successCallback();
    }
  } catch (error) {
    dispatch(setRegisterError(true));
    navigate("/prihlasenie");
    errorCallback();
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userId: null,
    loginError: false,
    registerError: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
  },
});

export const {
  setToken,
  setUserId,
  setLoginError,
  setRegisterError,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice;