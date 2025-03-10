import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import "../styling/layouts/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="nav-container">
      <div className="logo">
        <Link to="/">AppName</Link>
      </div>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>

        {user ? (
          <div className="auth-links">
            <Link to="/dashboard" className="dashboard-btn">
              Dashboard
            </Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="home-login-btn">
              Login
            </Link>
            <Link to="/register" className="home-register-btn">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
