import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  deletePost,
  updatePost,
  updatePostInStore,
  removePostFromStore,
} from "../store/actions/postActions";
import Cards from "../components/Cards";
import Header from "../components/Header";
import { toast } from "react-toastify";

function ManagePosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]); // Add `posts` dependency to re-render when updated

  // State for editing a post
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [editPostId, setEditPostId] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission for updating a post
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Please fill in all fields.");
      return;
    }

    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    if (formData.image) postData.append("image", formData.image);

    dispatch(updatePost(editPostId, postData));
    dispatch(updatePostInStore(editPostId, formData)); // ✅ Pass updated data
    toast.success("Post updated successfully!");
    setFormData({ title: "", content: "", image: null });
    setEditPostId(null);
  };

  const handleEditPost = (post) => {
    setEditPostId(post._id);
    setFormData({
      title: post.title,
      content: post.content,
      image: null,
    });
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
    dispatch(removePostFromStore(postId)); // Remove post from Redux store
    toast.success("Post deleted successfully!");
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : posts.length === 0 ? (
            <div className="text-center">
              <img src="/images/no-posts.svg" alt="No Posts" width="250px" />
              <p>No posts available.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Cards
                key={post._id}
                post={post}
                onView={() => navigate(`/post/${post._id}`)}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post._id)}
                isEditable={true}
              />
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editPostId && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Blog Post</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditPostId(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditPostId(null)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManagePosts;
