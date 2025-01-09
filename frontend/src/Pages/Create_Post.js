import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Create_Post() {
  return (
    <>
      <Header />
      <div className="container my-5 mx-5 px-4 py-4">
        <h2 className="text-center mb-2 mt-4">Add New Post</h2>
        <div className="row justify-content-center">
          <form className="col-md-12 col-sm-8">
            <div className="form-group mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter post title"
                value=""
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter post description"
                value=""
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Enter image URL"
                value=""
              />
            </div>

            <button
              type="submit"
              className="btn  btn-main btn-round-full"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Create_Post