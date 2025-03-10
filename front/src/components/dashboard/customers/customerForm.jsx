import React, { useState, useEffect } from "react";
import "./../../../styling/dashboard/customerForm.css";

const CustomerForm = ({
  onSubmit,
  onCancel,
  initialData,
  onFetchFilterOptions,
}) => {
  // Form data state matching the backend model
  const [formData, setFormData] = useState({
    CusID: "",
    Name: "",
    Phone: "",
    Phone2: "",
    Email: "",
    CompID: "",
    OpenBalance: 0,
    Website: "",
    Address: "",
    City: "",
    Zipcode: "",
    Country: "",
    ContactPerson: "",
    JobPosition: "",
    ContactPhone: "",
    ContactMobile: "",
    ContactEmail: "",
    DeliveryAddress: "",
    BranchID: "",
    CMdays: 0,
    DueLimit: 0,
    TDS: 0,
    VDS: 0,
    AgentID: "",
    CustomerCode: "",
    Type: "",
    crefitlimit: 0,
    SalesPerson: "",
    AreaID: "",
    Code: "",
    Custype: "",
    autocode: true, // Default to true for auto-generation
    CusRemarks: "",
    BirthDate: "",
    IsLoyal: false,
    LoyaltyActivationDate: "",
    LoyalCardNo: "",
    ZoneID: "",
  });

  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    CustomerCodes: [],
    Custypes: [],
    ZoneIDs: [],
    AreaIDs: [],
    SalesPersons: [],
  });
  const [activeTab, setActiveTab] = useState("basic"); // For tab navigation

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      // Format dates properly for form inputs
      const formattedData = { ...initialData };

      if (formattedData.BirthDate) {
        formattedData.BirthDate = new Date(formattedData.BirthDate)
          .toISOString()
          .split("T")[0];
      }

      if (formattedData.LoyaltyActivationDate) {
        formattedData.LoyaltyActivationDate = new Date(
          formattedData.LoyaltyActivationDate
        )
          .toISOString()
          .split("T")[0];
      }

      setFormData(formattedData);
    }

    loadFilterOptions();
  }, [initialData]);

  // Fetch filter options for dropdowns
  const loadFilterOptions = async () => {
    const options = await onFetchFilterOptions();
    if (options) {
      setFilterOptions(options);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle different input types
    let newValue = value;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    } else if (type === "url" && value !== "") {
      // Only process non-empty URL values
      try {
        // Try to add https:// if no protocol is specified
        if (!/^https?:\/\//i.test(value)) {
          newValue = `https://${value}`;
        }
      } catch (error) {
        // If URL is invalid, keep the original value
        newValue = value;
      }
    }

    setFormData({ ...formData, [name]: newValue });
  };

  // Toggle autocode generation
  const handleAutocodeChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      autocode: checked,
      CustomerCode: checked ? "" : formData.CustomerCode, // Clear code if auto-generation is enabled
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await onSubmit(formData);
      if (result) {
        setSuccess(
          `Customer successfully ${initialData ? "updated" : "created"}`
        );
        if (!initialData) {
          setFormData({
            // Reset to initial state
            CusID: "",
            Name: "",
            Phone: "",
            Phone2: "",
            Email: "",
            CompID: "",
            OpenBalance: 0,
            Website: "",
            Address: "",
            City: "",
            Zipcode: "",
            Country: "",
            ContactPerson: "",
            JobPosition: "",
            ContactPhone: "",
            ContactMobile: "",
            ContactEmail: "",
            DeliveryAddress: "",
            BranchID: "",
            CMdays: 0,
            DueLimit: 0,
            TDS: 0,
            VDS: 0,
            AgentID: "",
            CustomerCode: "",
            Type: "",
            crefitlimit: 0,
            SalesPerson: "",
            AreaID: "",
            Code: "",
            Custype: "",
            autocode: true, // Reset to default auto-generation
            CusRemarks: "",
            BirthDate: "",
            IsLoyal: false,
            LoyaltyActivationDate: "",
            LoyalCardNo: "",
            ZoneID: "",
          });

          setActiveTab("basic"); // Reset to basic tab after successful submission
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save customer");
      console.error("Error saving customer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="customer-form-container">
      <h2>{initialData ? "Edit Customer" : "Add New Customer"}</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Tab Navigation */}
      <div className="form-tabs">
        <button
          className={activeTab === "basic" ? "active" : ""}
          onClick={() => setActiveTab("basic")}
        >
          Basic Information
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
      </div>

      <form onSubmit={handleSubmit} className="customer-form">
        {/* Basic Information Tab */}
        <div className={`tab-content ${activeTab === "basic" ? "active" : ""}`}>
          <div className="form-row">
            <div className="form-group required">
              <label htmlFor="CusID">Customer ID</label>
              <input
                type="text"
                id="CusID"
                name="CusID"
                value={formData.CusID}
                onChange={handleChange}
                required
                disabled={initialData} // Cannot edit ID if updating
              />
            </div>

            <div className="form-group required">
              <label htmlFor="Name">Customer Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="autocode">Auto-generate Customer Code</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="autocode"
                  name="autocode"
                  checked={formData.autocode}
                  onChange={handleAutocodeChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="CustomerCode">Customer Code</label>
              <input
                type="text"
                id="CustomerCode"
                name="CustomerCode"
                value={formData.CustomerCode}
                onChange={handleChange}
                disabled={formData.autocode}
                placeholder={formData.autocode ? "Will be auto-generated" : ""}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Custype">Customer Type</label>
              <select
                id="Custype"
                name="Custype"
                value={formData.Custype}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {filterOptions.Custypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="CompID">Company ID</label>
              <input
                type="text"
                id="CompID"
                name="CompID"
                value={formData.CompID}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ZoneID">Zone</label>
              <select
                id="ZoneID"
                name="ZoneID"
                value={formData.ZoneID}
                onChange={handleChange}
              >
                <option value="">Select Zone</option>
                {filterOptions.ZoneIDs.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="AreaID">Area</label>
              <select
                id="AreaID"
                name="AreaID"
                value={formData.AreaID}
                onChange={handleChange}
              >
                <option value="">Select Area</option>
                {filterOptions.AreaIDs.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="CusRemarks">Remarks</label>
            <textarea
              id="CusRemarks"
              name="CusRemarks"
              value={formData.CusRemarks}
              onChange={handleChange}
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* Contact Details Tab */}
        <div
          className={`tab-content ${activeTab === "contact" ? "active" : ""}`}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Phone">Phone</label>
              <input
                type="tel"
                id="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Phone2">Alternative Phone</label>
              <input
                type="tel"
                id="Phone2"
                name="Phone2"
                value={formData.Phone2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Website">Website</label>
              <input
                type="url"
                id="Website"
                name="Website"
                value={formData.Website || ""} // Add default empty string
                onChange={handleChange}
                placeholder="https://"
                pattern="https?://.*" // Add pattern for URL validation
                title="Please enter a valid URL starting with http:// or https://" // Add helpful message
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <textarea
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                rows={2}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="DeliveryAddress">Delivery Address</label>
              <textarea
                id="DeliveryAddress"
                name="DeliveryAddress"
                value={formData.DeliveryAddress}
                onChange={handleChange}
                rows={2}
              ></textarea>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="City">City</label>
              <input
                type="text"
                id="City"
                name="City"
                value={formData.City}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Zipcode">Zipcode</label>
              <input
                type="text"
                id="Zipcode"
                name="Zipcode"
                value={formData.Zipcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Country">Country</label>
              <input
                type="text"
                id="Country"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="section-divider" />
          <h3>Contact Person Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ContactPerson">Contact Person</label>
              <input
                type="text"
                id="ContactPerson"
                name="ContactPerson"
                value={formData.ContactPerson}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="JobPosition">Job Position</label>
              <input
                type="text"
                id="JobPosition"
                name="JobPosition"
                value={formData.JobPosition}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ContactPhone">Contact Phone</label>
              <input
                type="tel"
                id="ContactPhone"
                name="ContactPhone"
                value={formData.ContactPhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ContactMobile">Contact Mobile</label>
              <input
                type="tel"
                id="ContactMobile"
                name="ContactMobile"
                value={formData.ContactMobile}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ContactEmail">Contact Email</label>
              <input
                type="email"
                id="ContactEmail"
                name="ContactEmail"
                value={formData.ContactEmail}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Financial Information Tab */}
        <div
          className={`tab-content ${activeTab === "financial" ? "active" : ""}`}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="OpenBalance">Opening Balance</label>
              <input
                type="number"
                step="0.01"
                id="OpenBalance"
                name="OpenBalance"
                value={formData.OpenBalance}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="crefitlimit">Credit Limit</label>
              <input
                type="number"
                step="0.01"
                id="crefitlimit"
                name="crefitlimit"
                value={formData.crefitlimit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="DueLimit">Due Limit</label>
              <input
                type="number"
                step="0.01"
                id="DueLimit"
                name="DueLimit"
                value={formData.DueLimit}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="CMdays">CM Days</label>
              <input
                type="number"
                id="CMdays"
                name="CMdays"
                value={formData.CMdays}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="TDS">TDS %</label>
              <input
                type="number"
                step="0.01"
                id="TDS"
                name="TDS"
                value={formData.TDS}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="VDS">VDS %</label>
              <input
                type="number"
                step="0.01"
                id="VDS"
                name="VDS"
                value={formData.VDS}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="SalesPerson">Sales Person</label>
              <select
                id="SalesPerson"
                name="SalesPerson"
                value={formData.SalesPerson}
                onChange={handleChange}
              >
                <option value="">Select Sales Person</option>
                {filterOptions.SalesPersons.map((salesperson) => (
                  <option key={salesperson} value={salesperson}>
                    {salesperson}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="BranchID">Branch ID</label>
              <input
                type="text"
                id="BranchID"
                name="BranchID"
                value={formData.BranchID}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="AgentID">Agent ID</label>
              <input
                type="text"
                id="AgentID"
                name="AgentID"
                value={formData.AgentID}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Loyalty Tab */}
        <div
          className={`tab-content ${activeTab === "loyalty" ? "active" : ""}`}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="IsLoyal">Loyalty Customer</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="IsLoyal"
                  name="IsLoyal"
                  checked={formData.IsLoyal}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="LoyalCardNo">Loyalty Card Number</label>
              <input
                type="text"
                id="LoyalCardNo"
                name="LoyalCardNo"
                value={formData.LoyalCardNo}
                onChange={handleChange}
                disabled={!formData.IsLoyal}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="BirthDate">Birth Date</label>
              <input
                type="date"
                id="BirthDate"
                name="BirthDate"
                value={formData.BirthDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="LoyaltyActivationDate">
                Loyalty Activation Date
              </label>
              <input
                type="date"
                id="LoyaltyActivationDate"
                name="LoyaltyActivationDate"
                value={formData.LoyaltyActivationDate}
                onChange={handleChange}
                disabled={!formData.IsLoyal}
              />
            </div>
          </div>
        </div>

        {/* Form Actions - Always Visible */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : initialData
              ? "Update Customer"
              : "Add Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
