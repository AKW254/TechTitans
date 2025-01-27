import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserInfo,
  updateProfileRequest
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      dispatch(getUserInfo()); // Fetch user info
    }
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error if there's an issue
    }
  }, [error]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setFormData({
      username: user.username || "",
      email: user.email || "",
    });
    setEditMode(false);
  };

  const handleSaveClick = () => {
    dispatch(updateProfileRequest(formData))
      .then(() => {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update profile");
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
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
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
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
                      readOnly={!editMode}
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
                      readOnly={!editMode}
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
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleEditClick}
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
