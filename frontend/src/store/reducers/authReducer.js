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

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Auth Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload, // Store user object (_id, username, email)
        isAuthenticated: true,
        error: null,
      };
   
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    
    case PROFILE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
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
