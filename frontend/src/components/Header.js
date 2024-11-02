import React from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, username, logout } = useAuth(); // Destructure username and logout

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Tech Titans</a>
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
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link" href="/create-post">Create Post</a>
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
