// The Login component handles user authentication by providing a form for users to input their email and password.
// It interacts with Redux for state management and redirects authenticated users to the home page.

import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const HOME_ROUTE = "/Home"; // Define route constant


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading,error, isAuthenticated } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Used to track previous values
  const prevError = useRef(null);
  const prevAuth = useRef(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill in both email and password fields.");
      return;
    }
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    // Show error toast only if error changes
    if (
      error &&
      error !== prevError.current &&
      credentials.email &&
      credentials.password
    ) {
      toast.error(`Login failed: ${error}`);
    }

    // Show success toast only if isAuthenticated changes to true
    if (isAuthenticated && isAuthenticated !== prevAuth.current) {
      toast.success("Login successful!");
      setTimeout(() => navigate(HOME_ROUTE), 100); // Delay navigation to ensure state updates
    }

    // Update previous values
    prevError.current = error;
    prevAuth.current = isAuthenticated;
  }, [error, isAuthenticated, navigate, credentials.email, credentials.password]);

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100">
          {loading && <p>Loading...</p>}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
            <img
              src="images/Computer login-rafiki.svg" // Illustration for the login page to enhance user experience
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
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <button
                      type="submit"
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
