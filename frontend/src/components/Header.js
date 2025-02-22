import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/actions/authActions";
import { persistor } from "../store/config"; // Import persistor

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for username (ensures immediate UI update)
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isAuthenticated && persistor.getState().bootstrapped) {
      navigate("/login");
    }
    if (isAuthenticated && user.username) {
      setUsername(user.username); // Updates username immediately on login
    }
  }, [isAuthenticated, user, navigate]);

  const handleNavigation = (path) => navigate(path);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="navigation">
      <nav className="navbar fixed-top navbar-expand-lg px-2 mb-2" id="navbar">
        <div className="container">
          <a className="navbar-brand" href="/#">
            Tech<span>Titans.</span>
          </a>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span>
          </button>

          <div
            className="collapse navbar-collapse text-center"
            id="navbarsExample09"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active float-right">
                <a className="nav-link" href="/Home">
                  Home
                </a>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => handleNavigation("/Create Post")}
                    >
                      Create Post
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => handleNavigation("/Manage Post")}
                    >
                      Manage Posts
                    </button>
                  </li>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle btn btn-link"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        {username || "User"}
                      </span>
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/profile")}
                      >
                        Profile
                      </button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
