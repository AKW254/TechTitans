import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, username, login, logout } = useAuth(); // Destructure from context

  // Check session on mount using useEffect
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:${[3001, 500].includes(parseInt(window.location.port)) ? window.location.port : 3001}/api/auth/checksession",
          {
            withCredentials: true, // This ensures cookies are sent along with the request
          }
        );
        if (response.data.user) {
          console.log("User is authenticated:", response.data.user);
          login(response.data.user); // Update auth state with the user data
        }
      } catch (error) {
        console.error("No active session or invalid token", error);
      }
    };

    checkSession();
  }, [login]); // Include `login` as a dependency to ensure it’s properly invoked

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Tech Titans
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link active" href="/createpost">
                  Create Post
                </a>
              </li>
            )}
          </ul>
          <div className="d-flex ms-auto">
            {isAuthenticated ? (
              <>
                <span className="navbar-text me-3">Welcome, {username}</span>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <a className="btn btn-outline-primary me-2" href="/login">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
