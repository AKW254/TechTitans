import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../store/actions/postActions";
import { useParams } from "react-router-dom";
import Header from "..//components/Header";
function Single_post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
      dispatch(getPostById(id));
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found</p>;
  return (
    <>
      <Header />
      <section class="section blog-wrap bg-gray">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-8">
              <div class="row">
                <div class="col-lg-12 mb-5">
                  <div class="single-blog-item">
                    <img
                      src={`http://localhost:5000/uploads/${post.image}`}
                      alt={post.title}
                      class="img-fluid rounded"
                    />
                    <div class="blog-item-content bg-white p-5">
                      <h2 class="mt-3 mb-4">{post.title}</h2>
                      <p>{post.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="sidebar-wrap">
                <div class="sidebar-widget card border-0 mb-3">
                  <img
                    src={`http://localhost:5000/uploads/default.png`}
                    alt=""
                    class="img-fluid"
                  />
                  <div class="card-body p-4 text-center">
                    <h5 class="mb-0 mt-4">{post.username}</h5>
                    <p class="text-muted mb-0">Blog Author</p>
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

export default Single_post;
