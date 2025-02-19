import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store/actions/postActions";
import { CREATE_POST_REQUEST } from "../store/actionTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";

function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.post);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // Ensure this handles a file input
  });

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
 const handleSubmit = (e) => {
   e.preventDefault();

   if (!formData.title || !formData.content || !formData.image) {
     toast.error("Please fill in all fields.");
     return;
   }

   dispatch({ type: CREATE_POST_REQUEST }); // Reset success before creating post

   const postData = new FormData();
   postData.append("title", formData.title);
   postData.append("content", formData.content);
   postData.append("image", formData.image);

   dispatch(createPost(postData));
 };


  // Handle post creation success and errors
 useEffect(() => {
   if (error) {
     toast.error(error);
   }
   if (success) {
     toast.success("Post created successfully!");
     setTimeout(() => {
       navigate("/Home");
       dispatch({ type: CREATE_POST_REQUEST }); // Reset success state
     }, 1000);
   }
 }, [error, success, navigate, dispatch]);

  return (
    <>
      <Header />
      <div className="container my-5 px-4 py-4">
        <h2 className="text-center mb-4">Add New Post</h2>
        <div className="row justify-content-center">
          <form
            className="col-md-8"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter post title"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="content">Description</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="4"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Enter post description"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleFileChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
