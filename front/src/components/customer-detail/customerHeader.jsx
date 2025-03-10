import React from "react";
import { FaStar } from "react-icons/fa";

const CustomerHeader = ({ customer }) => {
  // Format creation date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="customer-header">
      <div className="customer-avatar">
        <div className="avatar-placeholder">
          {customer.Name ? customer.Name.charAt(0).toUpperCase() : "C"}
        </div>
        {customer.IsLoyal && (
          <div className="loyalty-badge">
            <FaStar />
          </div>
        )}
      </div>

      <div className="customer-title">
        <h1>{customer.Name}</h1>
        <div className="customer-subtitle">
          <span className="customer-code">{customer.CustomerCode}</span>
          {customer.Custype && (
            <span className="customer-type">{customer.Custype}</span>
          )}
          <span className="customer-since">
            Customer since {formatDate(customer.CreateDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
