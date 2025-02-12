import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
} from "../actionTypes"; // Import action types
const API_URL = process.env.REACT_APP_API_URL;
export const registerRequest = (userData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};

export const loginRequest = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" }); // Dispatch login request action
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials, {
        withCredentials: true, // Ensure cookies are sent/received
      });

      const { user, token } = response.data;

      // Save token in cookies for security
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: user }); // Dispatch success action with user data
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data.message || error.message,
      }); // Dispatch failure action with error message
    }
  };
};
export const logout = () => {
  return (dispatch) => {
    Cookies.remove("token"); // Remove token
    Cookies.remove("user"); // Remove user info

    dispatch({ type: "LOGOUT" });
    window.location.href = "/login"; // Redirect to login page
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_REQUEST" });

    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true, // Ensure cookies are included
      });

      dispatch({
        type: "GET_USER_SUCCESS",
        payload: response.data, // Assumes user data is returned in response.data
      });
    } catch (error) {
      let errorMessage = "Failed to fetch user information";

      if (error.response) {
        // Backend responded with a status code outside the 2xx range
        errorMessage =
          error.response.data?.message || error.response.statusText;

        if (error.response.status === 401) {
          // Unauthorized - Log the user out
          dispatch({ type: "LOGOUT" });
        }
      } else if (error.request) {
        // Request made, but no response received
        errorMessage = "Network error - Please check your connection";
      }

      dispatch({
        type: "GET_USER_FAILURE",
        payload: errorMessage,
      });

      console.error("Error fetching user info:", errorMessage);
      throw error; // Optional: Re-throw to let the calling component handle it
    }
  };
};

export const updateProfileRequest =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_UPDATE_REQUEST });

      const {
        auth: { user },
      } = getState(); // Get current user

      console.log("Form Data Sent:", formData); // Debugging

      const { data } = await axios.put(`${API_URL}/users/profile`, formData, {
        withCredentials: true,
      });

      console.log("Updated User Data:", data); // Debugging

      dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

      // Update Redux state and persist in local storage
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem(
        "authState",
        JSON.stringify({ ...getState().auth, user: data })
      );
    } catch (error) {
      dispatch({
        type: PROFILE_UPDATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
