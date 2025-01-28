import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});
