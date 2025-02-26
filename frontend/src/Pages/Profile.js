import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser, updateProfile } from "../store/actions/authActions";
import Header from "../components/Header";
import { persistor } from "../store/config"; // Import persistor

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const { user, isAuthenticated ,loading, error} = useSelector((state) => state.auth);


  // Local state for username (ensures immediate UI update)
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });


  useEffect(() => {
    if (!isAuthenticated && persistor.getState().bootstrapped) {
      navigate("/login");
    }
    if (isAuthenticated) {
      
    }
  }, [isAuthenticated, user, navigate]);

  const handleNavigation = (path) => navigate(path);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  // Sync formData with user state
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "", // Handle both cases
        email: user.email || "",
      });
    }
  }, [user]);


  // Show error notification
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSaveClick = async () => {
    if (!formData.username || !formData.email) {
      toast.error("Username and email are required!");
      return;
    }

    try {
      await dispatch(updateProfile(formData));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  // Cancel edit mode
  const handleCancelClick = () => {
    setFormData({
      username: user.username || "",
      email: user.email || "",
    });
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        {/* Main Content */}
        <main className="flex-grow-1">
          <div className="container py-4 mt-2">
            <div className="row g-4">
              {/* Left Column: User Info */}
              <div className="col-12 col-md-6 py-4 mt-2">
                <div className="card shadow-sm">
                  <div className="card-header  fw-bold">
                    <h4 className="mb-0">User Information</h4>
                  </div>
                  <div className="card-body">
                    {user ? (
                      <>
                        <p>
                          <strong>Username:</strong> {user.username}
                        </p>
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                      </>
                    ) : (
                      <p>No user information available.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Update Form */}
              <div className="col-12 col-md-6 py-4 mt-2">
                <div className="card shadow-sm">
                  <div className="card-header  fw-bold">
                    <h4 className="mb-0">Update Profile</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-4">
                        <label htmlFor="username" className="form-label">
                          Username:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          readOnly={!editMode || loading}
                          disabled={loading}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          readOnly={!editMode || loading}
                          disabled={loading}
                        />
                      </div>
                      {editMode ? (
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSaveClick}
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleCancelClick}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary w-100 mt-3"
                          onClick={() => setEditMode(true)}
                        >
                          Edit Profile
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  
    </>
  );
};

export default Profile;
