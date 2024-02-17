import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import tasksReducer, { addItem, setIsLoading } from "./tasksSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["isLoading"], // remove isLoading from localStorage
};

// auto save to local storage when state in reducer change
const persistedReducer = persistReducer(persistConfig, tasksReducer);

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// listen addItem event to show Loading
listenerMiddleware.startListening({
  matcher: isAnyOf(addItem),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsLoading(true));

    let intervalRef;
    intervalRef = setInterval(() => {
      listenerApi.dispatch(setIsLoading(false));
      clearInterval(intervalRef);
    }, 400);
  },
});

export const store = configureStore({
  reducer: { tasks: persistedReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
