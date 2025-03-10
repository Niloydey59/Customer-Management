import React, { useState } from "react";
import ProfileInfo from "./profile/ProfileInfo";
import ChangePassword from "./profile/ChangePassword";

import "./../../styling/dashboard/userProfile.css";

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="user-profile">
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Profile Information
        </button>
        <button
          className={`tab-button ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "info" ? (
          <ProfileInfo user={user} />
        ) : (
          <ChangePassword />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
