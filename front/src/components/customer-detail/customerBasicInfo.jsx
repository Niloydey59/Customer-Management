import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaTag } from "react-icons/fa";

const CustomerBasicInfo = ({ customer }) => {
  return (
    <div className="info-section">
      <h2>Basic Information</h2>

      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Customer ID</span>
          <span className="info-value">{customer.CusID}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Customer Code</span>
          <span className="info-value">{customer.CustomerCode || "N/A"}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Company ID</span>
          <span className="info-value">{customer.CompID || "N/A"}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Customer Type</span>
          <span className="info-value">
            {customer.Custype ? (
              <span className="badge">{customer.Custype}</span>
            ) : (
              "N/A"
            )}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Zone</span>
          <span className="info-value">
            {customer.ZoneID ? (
              <span className="badge-zone">
                <FaMapMarkerAlt /> {customer.ZoneID}
              </span>
            ) : (
              "N/A"
            )}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Area</span>
          <span className="info-value">
            {customer.AreaID ? (
              <span className="badge-area">
                <FaMapMarkerAlt /> {customer.AreaID}
              </span>
            ) : (
              "N/A"
            )}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Branch</span>
          <span className="info-value">
            {customer.BranchID ? (
              <span>
                <FaBuilding /> {customer.BranchID}
              </span>
            ) : (
              "N/A"
            )}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Sales Person</span>
          <span className="info-value">{customer.SalesPerson || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerBasicInfo;
