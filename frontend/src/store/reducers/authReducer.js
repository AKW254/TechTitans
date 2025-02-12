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

const initialState = JSON.parse(localStorage.getItem("authState")) || {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Auth Reducer
const authReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      newState = {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
      localStorage.setItem("authState", JSON.stringify(newState)); // Save to localStorage
      return newState;

    case GET_USER_SUCCESS:
      newState = {
        ...state,
        loading: false,
        user: action.payload.data,
        isAuthenticated: true,
        error: null,
      };
      localStorage.setItem("authState", JSON.stringify(newState));
      return newState;

    case PROFILE_UPDATE_SUCCESS:
      const updatedUser = { ...state.user, ...action.payload };

      // Save updated user to localStorage
      localStorage.setItem(
        "authState",
        JSON.stringify({
          ...state,
          user: updatedUser,
        })
      );

      return {
        ...state,
        user: updatedUser,
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case PROFILE_UPDATE_FAIL:
      newState = {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
      localStorage.setItem("authState", JSON.stringify(newState));
      return newState;

    case LOGOUT:
      localStorage.removeItem("authState"); // Clear storage on logout
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
