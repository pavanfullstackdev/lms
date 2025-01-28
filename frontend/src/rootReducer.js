import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../src/redux/reduxSlice/authSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
