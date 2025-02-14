import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  SINGLE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "../actionTypes";

const initialState =  {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
    case SINGLE_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case UPDATE_POST_REQUEST:    
    case DELETE_POST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false, error: null };

    case SINGLE_POST_SUCCESS:
      return { ...state, post: action.payload, loading: false, error: null };

    case CREATE_POST_SUCCESS:
      return { ...state, posts: action.payload, loading: false, error: null };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case GET_POSTS_FAILURE:
    case SINGLE_POST_FAILURE:
    case CREATE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
     export default postReducer;