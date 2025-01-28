import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registrationStart,
  registrationSuccess,
  registrationFailure,
} from "../reduxSlice/authSlice.js"; // Import the actions from your slice
import { API_BASE_URL } from "../apiConstants";
import { toast } from "sonner";
import { ExtractErrorMessage } from "../../utility/extractErrorMessage.jsx";

//User signup
export const signupUser = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registrationStart());
      const response = await axios.post(
        `${API_BASE_URL}/users/register`,
        credentials
      );
      dispatch(registrationSuccess(response.data));
      toast.success(response?.message || "Refistration was successful.");
      return response.data;
    } catch (error) {
      const errorMessage = ExtractErrorMessage(error);
      dispatch(registrationFailure(errorMessage));
      toast.error(errorMessage || "Please try again!");
      return rejectWithValue(errorMessage);
    }
  }
);
// Define the loginUser async thunk to handle login logic
export const loginUser = createAsyncThunk(
  "auth/login", // Action type
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart()); // Dispatch loginStart to show loading state
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        credentials
      ); // Replace with your login API endpoint
      dispatch(loginSuccess(response.data)); // Dispatch loginSuccess with user data
      toast.success(response?.message || "Login was successful.");
      return response.data; // Return user data to be used in the fulfilled case
    } catch (error) {
      const errorMessage = ExtractErrorMessage(error);
      dispatch(loginFailure(errorMessage)); // Dispatch loginFailure with error message
      toast.error(errorMessage || "Please try again!");
      return rejectWithValue(errorMessage); // Return error message to be used in the rejected case
    }
  }
);
