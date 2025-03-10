import React from "react";
import {
  FaUser,
  FaUserFriends,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import "./../../styling/dashboard/sidebar.css";
import { useAuth } from "../../context/authcontext";

const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => {
  const menuItems = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "customers", label: "Customer Management", icon: <FaUserFriends /> },
  ];

  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="app-logo">
          <FaTachometerAlt />
          <span>AppName</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="avatar">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : user?.username
            ? user.username.charAt(0).toUpperCase()
            : "U"}
        </div>
        <div className="user-info">
          <h4>{user?.name || user?.username || "User"}</h4>
          <p>{user?.email || "user@example.com"}</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={activeSection === item.id ? "active" : ""}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <span className="menu-icon">
            <FaSignOutAlt />
          </span>
          <span className="menu-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
