import axios from "axios";
import Cookies from "js-cookie";
import { persistor } from "../config"; // Import persistor
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
} from "../actionTypes";

const API_URL = process.env.REACT_APP_API_URL;

// Register User
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/users/register`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Login User
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/users/login`, credentials, {
      withCredentials: true, // Ensure cookies are handled properly
    });

    // Assuming your API response structure is:
    // { success: true, data: { _id, username, email }, token: "..." }
    const { data: userData, token } = data;

    // Store token in cookies with a consistent key: "jwt"
    Cookies.set("jwt", token, { secure: true, sameSite: "Strict" });
    // Optionally store user data in a cookie (if needed, though HTTP-only cookies are safer for tokens)
    Cookies.set("user", JSON.stringify(userData), {
      secure: true,
      sameSite: "Strict",
    });

    dispatch({ type: LOGIN_SUCCESS, payload: userData });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Logout User
export const logoutUser = () => (dispatch) => {
  Cookies.remove("token");
  Cookies.remove("user");

  persistor.purge(); // Clears persisted auth state

  dispatch({ type: LOGOUT });
  window.location.href = "/login"; // Redirect user
};



// Update Profile
export const updateProfile = (formData) => async (dispatch, getState) => {
  dispatch({ type: PROFILE_UPDATE_REQUEST });

  try {
    const { data } = await axios.put(`${API_URL}/users/profile`, formData, {
      withCredentials: true,
    });

    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

    // Persist updated user info
    const updatedState = { ...getState().auth, user: data };
    Cookies.set("user", JSON.stringify(updatedState.user), { secure: true, sameSite: "Strict" });

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response?.data?.message || "Profile update failed",
    });
  }
};
