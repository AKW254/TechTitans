import React,{ useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../store/actions/postActions";
function Cards() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  // Handle view single post
  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-danger">Error: {error}</p>
        ) : posts.length === 0 ? (
          <div className="text-center">
            <img src="" alt="No Posts" width="250px" />
            <p className="mt-3">No posts available.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="col-lg-6 col-md-6 mb-5">
              <div className="blog-item">
                <img
                  src={`http://localhost:5000/public/uploads/${post.image}`}
                  alt={post.title}
                  className="img-fluid rounded"
                />
                <div className="blog-item-content bg-white p-5">
                  <h3 className="mt-3 mb-3">
                    <a onClick={() => handleViewPost(post._id)}>{post.title}</a>
                  </h3>
                  <p className="mb-4">
                    {post.content.length > 100
                      ? post.content.substring(0, 100) + "..."
                      : post.content}
                  </p>
                  <button
                    onClick={() => handleViewPost(post._id)}
                    className="btn btn-small btn-main btn-round-full"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cards;