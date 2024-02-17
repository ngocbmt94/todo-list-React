import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

// auto save to local storage when state in reducer change
const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: { tasks: persistedReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
