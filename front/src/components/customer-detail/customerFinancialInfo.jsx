import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaPercentage } from "react-icons/fa";

const CustomerFinancialInfo = ({ customer }) => {
  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Helper to check if a financial field exists and is not zero
  const hasValue = (value) => {
    return value !== undefined && value !== null && value !== 0;
  };

  return (
    <div className="info-section">
      <h2>Financial Information</h2>

      <div className="finance-summary">
        <div className="finance-card">
          <h3>Balance</h3>
          <div className="finance-amount">
            {formatCurrency(customer.OpenBalance)}
          </div>
          <div className="finance-type">
            {customer.BalanceType || "Opening Balance"}
          </div>
        </div>

        {hasValue(customer.crefitlimit) && (
          <div className="finance-card">
            <h3>Credit Limit</h3>
            <div className="finance-amount">
              {formatCurrency(customer.crefitlimit)}
            </div>
          </div>
        )}

        {hasValue(customer.DueLimit) && (
          <div className="finance-card">
            <h3>Due Limit</h3>
            <div className="finance-amount">
              {formatCurrency(customer.DueLimit)}
            </div>
          </div>
        )}
      </div>

      <div className="info-grid">
        {hasValue(customer.CMdays) && (
          <div className="info-item">
            <span className="info-label">
              <FaCalendarAlt /> Credit Period
            </span>
            <span className="info-value">{customer.CMdays} days</span>
          </div>
        )}

        {hasValue(customer.DebitHead) && (
          <div className="info-item">
            <span className="info-label">Debit Head</span>
            <span className="info-value">{customer.DebitHead}</span>
          </div>
        )}

        {hasValue(customer.CreditHead) && (
          <div className="info-item">
            <span className="info-label">Credit Head</span>
            <span className="info-value">{customer.CreditHead}</span>
          </div>
        )}

        {hasValue(customer.TDS) && (
          <div className="info-item">
            <span className="info-label">
              <FaPercentage /> TDS
            </span>
            <span className="info-value">{customer.TDS}%</span>
          </div>
        )}

        {hasValue(customer.VDS) && (
          <div className="info-item">
            <span className="info-label">
              <FaPercentage /> VDS
            </span>
            <span className="info-value">{customer.VDS}%</span>
          </div>
        )}

        {customer.AgentID && (
          <div className="info-item">
            <span className="info-label">Agent ID</span>
            <span className="info-value">{customer.AgentID}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFinancialInfo;
