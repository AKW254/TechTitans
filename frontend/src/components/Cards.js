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
            <a onClick={onView} style={{ cursor: "pointer" }}>
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
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-small btn-danger btn-round-full"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this post?")
                  ) {
                    onDelete();
                  }
                }}
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
