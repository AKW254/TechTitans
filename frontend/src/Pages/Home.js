import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../store/actions/postActions";
import Cards from "../components/Cards";
import Header from "../components/Header";

function HomePage() {
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, loading, error } = useSelector((state) => state.post);
  
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
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
                onView={handleViewPost}
                onEdit={null}
                onDelete={null}
                isEditable={false} // Enable edit and delete buttons
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
