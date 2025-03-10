import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaPrint, FaEnvelope } from "react-icons/fa";
import "../styling/customerDetail.css";

// Import components
import CustomerHeader from "../components/customer-detail/customerHeader";
import CustomerBasicInfo from "../components/customer-detail/customerBasicInfo";
import CustomerContactInfo from "../components/customer-detail/customerContactInfo";
import CustomerFinancialInfo from "../components/customer-detail/customerFinancialInfo";
import CustomerLoyaltyInfo from "../components/customer-detail/customerLoyaltyInfo";
import CustomerNotes from "../components/customer-detail/customerNotes";
import PageTitle from "../components/common/pageTitle";
import LoadingSpinner from "../components/common/loadingSpinner";

// Import API
import { getCustomerById } from "../fetchApi/customer";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        const data = await getCustomerById(id);
        if (data && data.customer) {
          setCustomer(data.customer);
        } else {
          throw new Error("Customer not found");
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
        setError(err.message || "Failed to load customer information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleEditClick = () => {
    // Navigate to edit page or open edit modal
    navigate(`/dashboard`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleEmailClick = () => {
    // Implement email functionality or navigate to email page
    if (customer?.Email) {
      window.location.href = `mailto:${customer.Email}?subject=Regarding your account`;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container customer-detail-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="primary-btn" onClick={handleBackClick}>
          <FaArrowLeft /> Back to Customer List
        </button>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="error-container customer-detail-error">
        <h2>Customer Not Found</h2>
        <p>
          The customer you're looking for doesn't exist or has been removed.
        </p>
        <button className="primary-btn" onClick={handleBackClick}>
          <FaArrowLeft /> Back to Customer List
        </button>
      </div>
    );
  }

  return (
    <div className="customer-detail-page">
      <PageTitle title={`Customer: ${customer.Name}`} />

      <div className="customer-detail-actions">
        <button className="back-btn" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
        <div className="action-buttons">
          <button className="edit-btn" onClick={handleEditClick}>
            <FaEdit /> Edit
          </button>
          <button className="print-btn" onClick={handlePrintClick}>
            <FaPrint /> Print
          </button>
          {customer.Email && (
            <button className="email-btn" onClick={handleEmailClick}>
              <FaEnvelope /> Email
            </button>
          )}
        </div>
      </div>

      <CustomerHeader customer={customer} />

      <div className="detail-tabs">
        <button
          className={activeTab === "basic" ? "active" : ""}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={activeTab === "contact" ? "active" : ""}
          onClick={() => setActiveTab("contact")}
        >
          Contact Details
        </button>
        <button
          className={activeTab === "financial" ? "active" : ""}
          onClick={() => setActiveTab("financial")}
        >
          Financial Info
        </button>
        <button
          className={activeTab === "loyalty" ? "active" : ""}
          onClick={() => setActiveTab("loyalty")}
        >
          Loyalty
        </button>
        {customer.CusRemarks && (
          <button
            className={activeTab === "notes" ? "active" : ""}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
        )}
      </div>

      <div className="detail-content">
        <div className={`tab-content ${activeTab === "basic" ? "active" : ""}`}>
          <CustomerBasicInfo customer={customer} />
        </div>
        <div
          className={`tab-content ${activeTab === "contact" ? "active" : ""}`}
        >
          <CustomerContactInfo customer={customer} />
        </div>
        <div
          className={`tab-content ${activeTab === "financial" ? "active" : ""}`}
        >
          <CustomerFinancialInfo customer={customer} />
        </div>
        <div
          className={`tab-content ${activeTab === "loyalty" ? "active" : ""}`}
        >
          <CustomerLoyaltyInfo customer={customer} />
        </div>
        {customer.CusRemarks && (
          <div
            className={`tab-content ${activeTab === "notes" ? "active" : ""}`}
          >
            <CustomerNotes customer={customer} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;
