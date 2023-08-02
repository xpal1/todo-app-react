import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;