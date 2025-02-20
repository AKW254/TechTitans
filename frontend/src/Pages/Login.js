import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user ,loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  ); // Get auth state from Redux

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials)); // Dispatch the login action
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast
    }
    if (isAuthenticated) {
      toast.success("Login successful!"); // Show success toast
      navigate("/Home"); // Redirect on successful login
    }
  }, [error, isAuthenticated,user, navigate]); // Dependencies: error, isAuthenticated, navigate

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100">
          {loading && <p>Loading...</p>}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
            <img
              src="images/Computer login-rafiki.svg" // Replace with your illustration/image URL
              alt="Illustration"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 col-md-8 col-12 d-flex align-items-center justify-content-center">
            <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
              <div className="card-body">
                <h3 className="text-center mb-3">Sign In</h3>
                <p className="text-muted text-center mb-4">
                  Welcome back! Please sign in to your account.
                </p>
                <form onSubmit={handleSubmit}>
                  {/* Fixed casing of onSubmit */}
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      name="password" // Fixed missing "name" attribute
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <button
                      type="submit" // Added type="submit"
                      className="btn btn-small btn-main btn-round-full"
                      disabled={loading} // Disable button during loading
                    >
                      Log In
                    </button>
                  </div>
                  <div className="text-center text-muted mb-3">
                    <a href="/register" className="text-decoration-none">
                      Don't have an account?
                    </a>
                  </div>
                </form>
                <div className="text-center mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
