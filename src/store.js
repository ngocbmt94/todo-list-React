import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./components/tasksSlice.js";

export const store = configureStore({
  reducer: { tasks: tasksReducer },
});
