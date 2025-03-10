import React from "react";
import {
  FaStar,
  FaCalendarAlt,
  FaBirthdayCake,
  FaIdCard,
} from "react-icons/fa";

const CustomerLoyaltyInfo = ({ customer }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!customer.IsLoyal && !customer.BirthDate) {
    return (
      <div className="info-section">
        <h2>Loyalty Information</h2>
        <div className="empty-state">
          <p>This customer is not enrolled in the loyalty program.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-section">
      <h2>Loyalty Information</h2>

      <div className="info-card loyalty-status">
        <div className="loyalty-badge-large">
          {customer.IsLoyal ? (
            <>
              <FaStar className="star-icon" />
              <span className="loyalty-text">Loyalty Member</span>
            </>
          ) : (
            <>
              <span className="no-loyalty-icon">✕</span>
              <span className="loyalty-text">Not Enrolled</span>
            </>
          )}
        </div>
      </div>

      <div className="info-grid">
        {customer.IsLoyal && customer.LoyalCardNo && (
          <div className="info-item">
            <span className="info-label">
              <FaIdCard /> Loyalty Card Number
            </span>
            <span className="info-value highlight">{customer.LoyalCardNo}</span>
          </div>
        )}

        {customer.IsLoyal && customer.LoyaltyActivationDate && (
          <div className="info-item">
            <span className="info-label">
              <FaCalendarAlt /> Activation Date
            </span>
            <span className="info-value">
              {formatDate(customer.LoyaltyActivationDate)}
            </span>
          </div>
        )}

        {customer.BirthDate && (
          <div className="info-item">
            <span className="info-label">
              <FaBirthdayCake /> Birth Date
            </span>
            <span className="info-value">{formatDate(customer.BirthDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLoyaltyInfo;
