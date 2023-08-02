import { createSlice } from "@reduxjs/toolkit";
import { navigate } from "@reach/router";
import axios from "axios";

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      username,
      password,
    });

    if (response.data.userId) {
      alert("Úspešne ste sa prihlásili!");
      dispatch(setToken(response.data.token));
      dispatch(setUserId(response.data.userId));
      // ulozenie udajov do localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      navigate("/todos");
    }
  } catch (error) {
    alert("Zadali ste nesprávne údaje!");
    dispatch(setLoginError(true));
    navigate("/registracia");
  }
};

export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/user/register", {
      username,
      email,
      password,
    });

    if (response.data.userObject) {
      alert("Úspešne ste sa zaregistrovali!");
      dispatch(setToken(response.data.token));
      navigate("/prihlasenie");
    }
  } catch (error) {
    alert("Už ste zaregistrovaní, choďte sa prihlásiť!");
    dispatch(setRegisterError(true));
    navigate("/prihlasenie");
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