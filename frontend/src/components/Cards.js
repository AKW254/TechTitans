import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Cards() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');

        // Check if posts are present in the response
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data); // Assuming the posts are directly in response.data
        } else {
         
          setPosts([]); // Set posts to an empty array if no posts are found
        }
      } catch (err) {
        // Set detailed error message in state
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.message || err.message || 'Error fetching posts';
          setError(errorMessage); // Display API error message or Axios error message
          
        } else {
          setError('Unexpected error occurred');
          
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return (
    <div className="loader">
      <div className="blob"></div>
    </div>
  );

  if (error) return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-90">
      <img src="images/Search-rafiki.svg" className="img-fluid mt-4" alt="No Post Available" style={{ maxWidth: '400px' }} />
      <h5 className="text-center fw-bolder">Error has occurred</h5>
    </div>
  );

  return (
    <div className="main-content">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {posts.length === 0 ? (
          <div className="container d-flex flex-column justify-content-center align-items-center vh-90">
            <img src="images/Search-rafiki.svg" className="img-fluid mt-4" alt="No Post Available" style={{ maxWidth: '400px' }} />
            <h5 className="text-center fw-bolder">No Post Available.</h5>
          </div>
        ) : (
          posts.map((post) => (
            <div className="col" key={post._id}>
              <div className="card h-100">
                <img src={post.image} className="card-img-top" alt={post.title} />
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
  );
}

export default Cards;