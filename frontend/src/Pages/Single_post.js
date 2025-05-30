import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../store/actions/postActions";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function SinglePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
 

  const { post, loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!post) return <div className="alert alert-warning">Post not found</div>;

  const isAuthor = post?.user?._id === user?._id;
  const authorName = isAuthor ? "Me" : post?.user?.username || "Unknown Author";

  

  return (
    <>
      <Header />
      <section className="section blog-wrap bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="single-blog-item">
                <img
                  src={`${process.env.REACT_APP_URL}/uploads/${
                    post?.image || `${process.env.REACT_APP_URL}/uploads/default_blog_post_image.png`
                  }`}
                  alt={post?.title || "No title available"}
                  className="img-fluid"
                  style={{ width: "650px", height: "360px" }}
                />
                <div className="blog-item-content bg-white p-5">
                  <h2 className="mt-3 mb-4">
                    {post?.title || "Untitled Post"}
                  </h2>
                  <p>{post?.content || "No content available."}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="sidebar-wrap">
                <div className="sidebar-widget card border-0 mb-3 text-center">
                  <img
                    src={`${process.env.REACT_APP_URL}/uploads/default.png`}
                    alt="Blog Author"
                    className="img-fluid rounded mx-auto d-block"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-body p-4">
                    <h5 className="mb-0 mt-4">{authorName}</h5>
                    <p className="text-muted mb-0">Blog Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SinglePost;
