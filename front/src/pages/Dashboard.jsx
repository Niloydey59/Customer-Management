import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import PageTitle from "../components/common/pageTitle";
import Sidebar from "../components/dashboard/Sidebar";
import UserProfile from "../components/dashboard/UserProfile";
import CustomersManagement from "../components/dashboard/customersManagement";
import "../styling/dashboard/dashboard.css";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { user, logout } = useAuth();
  console.log("User in Dashboard:", user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfile user={user} />;
      case "customers":
        return <CustomersManagement />;
      default:
        return <UserProfile user={user} />;
    }
  };

  return (
    <div className="dashboard-container">
      <PageTitle title="Dashboard" />

      <div className="dashboard-layout">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
          user={user}
        />

        <div className="dashboard-content">
          <div className="content-header">
            <h1>
              {activeSection === "profile"
                ? "User Profile"
                : "Customer Management"}
            </h1>
          </div>

          <div className="content-body">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
