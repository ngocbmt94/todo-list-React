import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./redux/tasksSlice.js";

export const store = configureStore({
  reducer: { tasks: tasksReducer },
});
