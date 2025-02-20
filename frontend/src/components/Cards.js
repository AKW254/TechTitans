import React from "react";

function Cards({ post, onView, onEdit, onDelete, isEditable }) {
 
  return (
    <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
      <div className="blog-item">
        <img
          src={`http://localhost:5000/uploads/${
            post.image || "default_blog_post_image.png"
          }`}
          alt={post.title || "No title"}
          className="img-fluid"
          style={{ width: "600px", height: "300px", objectFit: "cover" }}
        />
        <div className="blog-item-content bg-white p-5">
          <h3 className="mt-3 mb-3">
            <a onClick={() => onView(post._id)}>
              {post.title || "Untitled Post"}
            </a>
          </h3>
          <p className="mb-4">
            {post.content
              ? post.content.length > 100
                ? post.content.substring(0, 100) + "..."
                : post.content
              : "No content available."}
          </p>

          {isEditable ? (
            <>
              <button
                type="button"
                    className="btn btn-small btn-primary btn-round-full mx-2"
                    data-toggle="modal"
                    data-target="#editModal"
              >
                Edit
              </button>
              <button
                 type="button"
                    className="btn btn-small btn-danger btn-round-full"
                    data-toggle="modal"
                    data-target="#deleteModal"
              >
                Delete
              </button>
               <div
                  className="modal fade"
                  id="editModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="editModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                          Edit Blog Post
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              placeholder="Enter post title"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                              className="form-control"
                              id="description"
                              rows="3"
                              placeholder="Enter post description"
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                              type="file"
                              className="form-control"
                              id="image"
                              placeholder="Enter image URL"
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="deleteModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="deleteModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">
                          Delete Blog Post
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete this post?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              
            </>
          ) : (
            <button
              onClick={() => onView(post._id)}
              className="btn btn-small btn-main btn-round-full"
            >
              Learn More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
