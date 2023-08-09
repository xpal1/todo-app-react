import { createSlice } from "@reduxjs/toolkit";
import { navigate } from "@gatsbyjs/reach-router";
import axios from "axios";

export const loginUser = (
  username,
  password,
  successCallback,
  errorCallback
) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      username,
      password,
    });

    if (response.data.userId) {
      setTimeout(() => {
        dispatch(setToken(response.data.token));
        dispatch(setUserId(response.data.userId));
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", username);
        localStorage.setItem("token", response.data.token);
        navigate("/todos");
      }, 2500);

      successCallback();
    }
  } catch (error) {
    setTimeout(() => {
      dispatch(setLoginError(true));
      navigate("/registracia");
    }, 2500);

    errorCallback();
  }
};

export const registerUser = (
  username,
  email,
  password,
  successCallback,
  errorCallback
) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/user/register", {
      username,
      email,
      password,
    });

    if (response.data.userObject) {
      setTimeout(() => {
        dispatch(setRegisterSuccess(true));
        navigate("/prihlasenie");
      }, 2500);
      
      successCallback();
    }
  } catch (error) {
    setTimeout(() => {
      dispatch(setRegisterError(true));
      navigate("/prihlasenie");
    }, 2500);

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
    registerSuccess: false,
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
    setRegisterSuccess: (state, action) => {
      state.registerSuccess = action.payload;
    },
  },
});

export const {
  setToken,
  setUserId,
  setLoginError,
  setRegisterError,
  setRegisterSuccess,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice;