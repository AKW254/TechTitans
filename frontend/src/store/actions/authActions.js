import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
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
