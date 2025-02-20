import React from "react";

function Cards({ post, onView, onEdit, onDelete, isEditable }) {
  // Ensure post is not undefined before rendering
  if (!post) {
    console.error("Card received an undefined post");
    return null; // Prevents rendering an empty card
  }

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
                onClick={() => onEdit(post._id)}
                className="btn btn-small btn-warning ml-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="btn btn-small btn-danger ml-2"
              >
                Delete
              </button>
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
