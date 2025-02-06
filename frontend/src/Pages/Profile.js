import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserInfo,
  updateProfileRequest,
} from "../store/actions/authActions";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(getUserInfo());
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Sync formData with user state
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
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
      await dispatch(updateProfileRequest(formData));
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
      <div className="container mt-5">
        <div className="row">
          {/* Left Column: User Info */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>User Information</h4>
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Update Profile</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
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
                  <div className="mb-3">
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
                        className="btn btn-primary"
                        onClick={handleSaveClick}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelClick}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
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
      <Footer />
    </>
  );
};

export default Profile;
