import React, { useState } from "react";
import { useAuth } from "../../../context/authcontext";
import { updatePassword } from "../../../fetchApi/user";

const ChangePassword = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        text: "New passwords don't match",
        type: "error",
      });
      return false;
    }

    if (formData.newPassword.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters long",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Here you would make an API call to change the password
      await updatePassword(
        {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        user._id
      );

      // For now, we'll just simulate success
      setTimeout(() => {
        setMessage({
          text: "Password changed successfully!",
          type: "success",
        });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({
        text: error.message || "Failed to change password",
        type: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <div className="password-input-wrapper">
            <input
              type={passwordVisibility.currentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {passwordVisibility.currentPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <div className="password-input-wrapper">
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {passwordVisibility.newPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="password-input-wrapper">
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {passwordVisibility.confirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="change-pwd-btn" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
