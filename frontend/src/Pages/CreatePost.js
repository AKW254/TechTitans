import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

function CreatePost() {
  // Declare states for variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
     const getCookie = (name) => {
       const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop().split(";").shift();
       return null;
     };

     const token = getCookie("sessionId");
      const response = await axios.post(
        "http://localhost:3001/api/posts/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data",
             "Authorization": `Bearer ${token}`, // Add the token to the headers
           },
        }
      );
      console.log(response.data.message); // Show success message
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error uploading post:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-4 align-items-center">
        <h1 className="display-20 fw-bold fw-italic text-black text-center fst-italic">
          Create a Post
        </h1>
        <form onSubmit={handleCreatePost}>
          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id="content"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
                id="image"
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreatePost;
