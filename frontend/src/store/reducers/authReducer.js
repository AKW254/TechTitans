import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
} from "../actionTypes";

// Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    
    const { data } = await axios.post("/api/users/register", userData, {
      withCredentials: true, // Ensures cookies are sent
    });
    
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Login User
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    const { data } = await axios.post("/api/users/login", credentials, {
      withCredentials: true,
    });
    
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.post("/api/users/logout", {}, { withCredentials: true });
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// Get User Profile
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    
    const { data } = await axios.get("/api/users/profile", {
      withCredentials: true,
    });
    
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Profile
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    
    const { data } = await axios.put("/api/users/profile", profileData, {
      withCredentials: true,
    });
    
    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
