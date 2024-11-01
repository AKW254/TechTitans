import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signin() {
  // Declare variable and their states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Register function
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if password and confirm password are the same
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Send registration data to the server
      const response = await axios.post('http://localhost:3001//api/auth/register', {
        username,
        email,
        password,
      });

      // Show success message and navigate to login page
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      // Handle potential error response from the server
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-xl-8">
          <div className="form-signin mt-5">
            <form onSubmit={handleRegister}>
              <h1 className="h3 mb-3 fw-bolder text-center">Register</h1>

              <div className="col-12 mb-3">
                <input
                  type="text"
                  className="form-control rounded"
                  id="floatingUsername"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="email"
                  className="form-control rounded"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 text-center">
                <button className="w-50 btn btn-md btn-primary" type="submit">
                  Register
                </button>
              </div>

              <div className="text-center">
                <p className="mt-3">
                  Already have an account? <a href="/login">Sign in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin


