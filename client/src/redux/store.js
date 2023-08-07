import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import todoSlice from "./slices/todoSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    todo: todoSlice.reducer
  },
});

export default store;