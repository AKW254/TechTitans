import Post from "../models/post.js"; // Post model
import mongoose from "mongoose";
import multer from "multer";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; // Handle image upload

    // Validate required fields
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // Ensure image is required
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const post = new Post({
      title,
      content,
      image, // Save the filename to the database
      user: req.user.id, // Assuming `req.user.id` is set by authentication middleware
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username") // Populate user field with username
      .sort({ createdAt: -1 }); // Sort by latest created
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id).populate(
      "user",
      "username"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; // Handle image upload
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;

    // Handle file upload if a new file is uploaded
    if (req.file) {
      post.image = req.file.filename;
    }

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

