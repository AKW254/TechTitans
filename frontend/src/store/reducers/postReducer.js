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

const initialState = JSON.parse(localStorage.getItem("postsState")) || {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
    case SINGLE_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false, error: null };      

    case SINGLE_POST_SUCCESS:
      return { ...state, post: action.payload, loading: false, error: null };

    case CREATE_POST_SUCCESS:
        return { ...state, posts: action.payload, loading: false, error: null };    
     case    