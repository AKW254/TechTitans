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
  dispatch({ type: "UPDATE_POST_REQUEST" });

  // Optimistically update the state
  const { posts } = getState().post;
  const updatedPosts = posts.map((post) =>
    post._id === postId ? { ...post, ...Object.fromEntries(postData) } : post
  );

  dispatch({ type: "UPDATE_POST_SUCCESS", payload: updatedPosts });

  try {
    const { data } = await axios.put(`${API_URL}/posts/${postId}`, postData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    // Confirm update with server response
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_POST_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};


//Delete Post
export const deletePost = (postId) => async (dispatch, getState) => {
  dispatch({ type: "DELETE_POST_REQUEST" });

  // Optimistically remove post from state
  const { posts } = getState().post;
  const filteredPosts = posts.filter((post) => post._id !== postId);
  dispatch({ type: "DELETE_POST_SUCCESS", payload: filteredPosts });

  try {
    await axios.delete(`${API_URL}/posts/${postId}`, { withCredentials: true });
  } catch (error) {
    dispatch({
      type: "DELETE_POST_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update a single post in the Redux store
export const updatePostInStore =
  (postId, updatedData) => (dispatch, getState) => {
    const { posts } = getState().post;
    const newPosts = posts.map((post) =>
      post._id === postId ? { ...post, ...updatedData } : post
    );

    dispatch({ type: GET_POSTS_SUCCESS, payload: newPosts });
  };


// Remove a post from the Redux store
export const removePostFromStore = (postId) => (dispatch, getState) => {
  const { posts } = getState().post;
  dispatch({ type: GET_POSTS_SUCCESS, payload: posts.filter((post) => post._id !== postId) });
};

