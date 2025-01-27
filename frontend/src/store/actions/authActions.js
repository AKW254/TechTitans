import axios from "axios";
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
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const getUserInfo = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/users/getUserProfile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token
        },
      });
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};

export const updateProfileRequest = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    const {
      auth: { user },
    } = getState(); // Access the logged-in user's token from Redux state

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // Include the token for authenticated requests
      },
    };

    const { data } = await axios.put(
      `${API_URL}/users/updateUserProfile`,
      formData,
      config
    );

    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

    // Update user info in the Redux store after successful update
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};