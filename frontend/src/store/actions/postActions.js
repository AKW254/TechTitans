import axios from "axios";
 // Import js-cookie for handling cookies
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
} from "../actionTypes"; // Import action types
const API_URL = process.env.REACT_APP_API_URL;


//Create Post
export const createPost = (postData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST });

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // To send cookies with request
      };

      const response = await axios.post(
        `${API_URL}/posts/create`,
        postData,
        config
      );

      dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: CREATE_POST_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};


//Get Posts
export const getPosts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_POSTS_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/posts/`);
      dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_POSTS_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};

//Get single Post
export const getPostById = (postId) => {
  return async (dispatch) => {
    dispatch({ type: SINGLE_POST_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/posts/${postId}`);
      dispatch({ type: SINGLE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: SINGLE_POST_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};  



export const updatePost = (postId, postData) => async (dispatch, getState) => {
  // Dispatch request action
  dispatch({ type: UPDATE_POST_REQUEST });

  // Optimistically update the state:
  const { posts } = getState().post;
  const currentPost = posts.find((p) => p._id === postId);
  const optimisticPost = { ...currentPost, ...postData };

  // Immediately update state with optimistic changes
  dispatch({ type: UPDATE_POST_SUCCESS, payload: optimisticPost });

  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    // Send the update request to the server
    const { data } = await axios.put(
      `${API_URL}/posts/${postId}`,
      postData,
      config
    );

    // Confirm update by re-dispatching success with server response (if different)
    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
  } catch (error) {
    // Dispatch failure action, optionally revert optimistic update or notify the user
    dispatch({
      type: UPDATE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    // Optionally, you can re-fetch posts here or rollback state if needed
  }
};

//Delete Post
export const deletePost = (postId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_POST_REQUEST });
    try {
      const response = await axios.delete(`${API_URL}/posts/${postId}`, {
        withCredentials: true, // Ensure cookies are handled properly
      });
      dispatch({ type: DELETE_POST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: DELETE_POST_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };
};