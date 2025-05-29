import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const prevError = useRef(null);
  const prevAuth = useRef(false);

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setuserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const missingFields = [];
    if (!userData.username) missingFields.push("Username");
    if (!userData.email) missingFields.push("Email");
    if (!userData.password) missingFields.push("Password");

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (
      error &&
      error !== prevError.current &&
      userData.username &&
      userData.email &&
      userData.password
    ) {
      toast.error(`Registration failed: ${error}`);
    }

    if (isAuthenticated && isAuthenticated !== prevAuth.current) {
      toast.success("Registration successful!");
      navigate("/login"); // Redirect to login
    }

    // Update previous values
    prevError.current = error;
    prevAuth.current = isAuthenticated;
  }, [
    error,
    isAuthenticated,
    navigate,
    userData.username,
    userData.email,
    userData.password,
  ]);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
          <img
            src="/images/Sign up-rafiki.svg" // Replace with your illustration/image URL
            alt="Illustration"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 col-md-8 col-12 d-flex align-items-center justify-content-center">
          <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <div className="card-body">
              <h3 className="text-center mb-3">Register</h3>
              <p className="text-muted text-center mb-4">
                Create your account to get started!
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-small btn-main btn-round-full"
                  disabled={loading}
                >
                  Register
                </button>
              </form>
              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-decoration-none">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register