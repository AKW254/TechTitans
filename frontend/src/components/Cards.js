import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Cards() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts =async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setPosts(response.data);
// Check if posts are empty or undefined
if (response.data.posts && response.data.posts.length > 0) {
  setPosts(response.data.posts);
} else {
  console.log("No posts available");
  setPosts([]); // Set posts to an empty array if no posts are found
}
      } catch (error) {
        setError("Error fetching posts");
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="main-content">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {posts.length == 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div className="col" key={post._id}>
                <div className="card h-100">
                  <img src={post.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  )
}

export default Cards