import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/posts";

// Fetch Posts
export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch posts!");
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create Post
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, postData);
      toast.success("Post created successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to create post!");
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete Post
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}${postId}`);
      toast.success("Post deleted successfully!");
      return postId;
    } catch (error) {
      toast.error("Failed to delete post!");
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
