import React from 'react'

function Edit_Cards() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/1.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2"></div>

                <h3 className="mt-3 mb-3">
                  <a href="/Single Post">Improve design with typography?</a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <div className="d-flex justify-content-end">
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
                </div>

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
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/1.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2"></div>

                <h3 className="mt-3 mb-3">
                  <a href="/Single Post">Improve design with typography?</a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <div className="d-flex justify-content-end">
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
                </div>

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
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/1.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2"></div>

                <h3 className="mt-3 mb-3">
                  <a href="/Single Post">Improve design with typography?</a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <div className="d-flex justify-content-end">
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
                </div>

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
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/1.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2"></div>

                <h3 className="mt-3 mb-3">
                  <a href="/Single Post">Improve design with typography?</a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <div className="d-flex justify-content-end">
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
                </div>

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
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default Edit_Cards