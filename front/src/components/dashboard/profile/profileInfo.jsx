import React, { useState, useEffect } from "react";
import { useAuth } from "./../../../context/authcontext";
import { updateUserProfile } from "../../../fetchApi/user";

const ProfileInfo = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    phone: "",
    email: "", // Add email to formData
  });
  const [changedFields, setChangedFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        username: user.username || "",
        phone: user.phone || "",
        email: user.email || "", // Add email to formData
      });
      setChangedFields({}); // Reset changed fields when user data is loaded
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only track field if it's different from original user data
    if (value !== user[name]) {
      setChangedFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Remove field from changedFields if it's same as original
      setChangedFields((prev) => {
        const newFields = { ...prev };
        delete newFields[name];
        return newFields;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(changedFields).length === 0) {
      setMessage({
        text: "No changes made",
        type: "info",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Only send changed fields to backend
      const response = await updateUserProfile(changedFields, user._id);
      console.log(response.payload.updatedUser);
      setUser(response.payload.updatedUser);
      setMessage({
        text: "Profile updated successfully!",
        type: "success",
      });
      setIsEditing(false);
      setChangedFields({});
    } catch (error) {
      setMessage({
        text: error.message || "Failed to update profile",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="loading-indicator">Loading user information...</div>;
  }

  return (
    <div className="profile-info-container">
      <h2>Profile Information</h2>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
            />
            <small>Email cannot be changed</small>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setIsEditing(false);
                setChangedFields({});
                setFormData({
                  displayName: user.displayName || "",
                  username: user.username || "",
                  phone: user.phone || "",
                  email: user.email || "", // Add email to formData
                });
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={isLoading || Object.keys(changedFields).length === 0}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-field">
            <span className="field-label">Username:</span>
            <span className="field-value">{user.username}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Display Name:</span>
            <span className="field-value">
              {user.displayName || "Not provided"}
            </span>
          </div>

          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{user.email}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Phone:</span>
            <span className="field-value">{user.phone || "Not provided"}</span>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
