import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Pagination from "../../common/Pagination";

import "./../../../styling/dashboard/customersList.css";

const CustomersList = ({
  customers,
  onEdit,
  onDelete,
  onFetchCustomers,
  onFetchFilterOptions,
  isLoading,
  error,
  totalCustomers,
}) => {
  const [filterOptions, setFilterOptions] = useState({
    CustomerCodes: [],
    Custypes: [],
    ZoneIDs: [],
    AreaIDs: [],
    SalesPersons: [],
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    CustomerCode: "",
    Custype: "",
    ZoneID: "",
    AreaID: "",
    SalesPerson: "",
    sort: "Name",
    order: "asc",
  });

  // Filter visibility toggle
  const [showFilters, setShowFilters] = useState(false);

  // Add a new state to trigger data refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Update pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    const options = await onFetchFilterOptions();
    if (options) {
      setFilterOptions(options);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1
    onFetchCustomers({
      page: currentPage,
      limit: itemsPerPage,
      sort: filters.sort,
      order: filters.order,
      ...filters,
    });
  };

  // Handle sort change
  const handleSort = (field) => {
    if (filters.sort === field) {
      // Toggle order if same field
      setFilters({
        ...filters,
        order: filters.order === "asc" ? "desc" : "asc",
      });
    } else {
      // Set new sort field with asc order
      setFilters({
        ...filters,
        sort: field,
        order: "asc",
      });
    }
  };

  // Reset all filters and fetch default list
  const resetFilters = () => {
    const defaultFilters = {
      search: "",
      CustomerCode: "",
      Custype: "",
      ZoneID: "",
      AreaID: "",
      SalesPerson: "",
      sort: "Name",
      order: "asc",
    };

    setFilters(defaultFilters);
    setCurrentPage(1); // Reset to first page

    // Immediately fetch customers with default filters
    onFetchCustomers({
      page: 1,
      limit: itemsPerPage,
      ...defaultFilters,
    });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onFetchCustomers({
      ...filters,
      page,
      limit: itemsPerPage,
    });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);

    onFetchCustomers({
      ...filters,
      page: 1,
      limit: newLimit,
    });
  };

  // Add this function to handle custom limit input
  const handleCustomLimit = (limit) => {
    const newLimit = parseInt(limit);
    if (newLimit > 0) {
      setItemsPerPage(newLimit);
      setCurrentPage(1);

      onFetchCustomers({
        ...filters,
        page: 1,
        limit: newLimit,
      });
    }
  };

  // Update useEffect to include pagination parameters
  useEffect(() => {
    onFetchCustomers({
      ...filters,
      page: currentPage,
      limit: itemsPerPage,
    });
  }, [currentPage, itemsPerPage]);

  // Loading state
  if (isLoading && customers.length === 0) {
    return <div className="loading">Loading customers...</div>;
  }

  // Error state
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Empty state
  if (customers.length === 0) {
    return (
      <div className="customers-section">
        <div className="filter-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search customers..."
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
            <button
              type="button"
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button type="button" onClick={resetFilters} className="reset-btn">
              Reset
            </button>
          </form>

          {showFilters && (
            <div className="advanced-filters">
              <div className="filter-row">
                <div className="filter-group">
                  <label>Customer Code</label>
                  <select
                    name="CustomerCode"
                    value={filters.CustomerCode}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Codes</option>
                    {filterOptions.CustomerCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Customer Type</label>
                  <select
                    name="Custype"
                    value={filters.Custype}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    {filterOptions.Custypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Zone</label>
                  <select
                    name="ZoneID"
                    value={filters.ZoneID}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Zones</option>
                    {filterOptions.ZoneIDs.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label>Area</label>
                  <select
                    name="AreaID"
                    value={filters.AreaID}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Areas</option>
                    {filterOptions.AreaIDs.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Sales Person</label>
                  <select
                    name="SalesPerson"
                    value={filters.SalesPerson}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Sales Persons</option>
                    {filterOptions.SalesPersons.map((person) => (
                      <option key={person} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="apply-btn"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="no-customers">
          <p>No customers found matching your search criteria.</p>
        </div>
      </div>
    );
  }

  // Main customers list view
  return (
    <div className="customers-section">
      <div className="filter-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search customers..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
          <button
            type="button"
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button type="button" onClick={resetFilters} className="reset-btn">
            Reset
          </button>
        </form>

        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Customer Code</label>
                <select
                  name="CustomerCode"
                  value={filters.CustomerCode}
                  onChange={handleFilterChange}
                >
                  <option value="">All Codes</option>
                  {filterOptions.CustomerCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Customer Type</label>
                <select
                  name="Custype"
                  value={filters.Custype}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  {filterOptions.Custypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Zone</label>
                <select
                  name="ZoneID"
                  value={filters.ZoneID}
                  onChange={handleFilterChange}
                >
                  <option value="">All Zones</option>
                  {filterOptions.ZoneIDs.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Area</label>
                <select
                  name="AreaID"
                  value={filters.AreaID}
                  onChange={handleFilterChange}
                >
                  <option value="">All Areas</option>
                  {filterOptions.AreaIDs.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Sales Person</label>
                <select
                  name="SalesPerson"
                  value={filters.SalesPerson}
                  onChange={handleFilterChange}
                >
                  <option value="">All Sales Persons</option>
                  {filterOptions.SalesPersons.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="apply-btn"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="customers-list-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("CustomerCode")}>
                Code{" "}
                {filters.sort === "CustomerCode" &&
                  (filters.order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("Name")}>
                Name{" "}
                {filters.sort === "Name" &&
                  (filters.order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("Email")}>
                Email{" "}
                {filters.sort === "Email" &&
                  (filters.order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("Phone")}>
                Phone{" "}
                {filters.sort === "Phone" &&
                  (filters.order === "asc" ? "↑" : "↓")}
              </th>
              <th>Address</th>
              <th onClick={() => handleSort("Custype")}>
                Type{" "}
                {filters.sort === "Custype" &&
                  (filters.order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("OpenBalance")}>
                Balance{" "}
                {filters.sort === "OpenBalance" &&
                  (filters.order === "asc" ? "↑" : "↓")}
              </th>
              <th>Sales Person</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id || customer.CusID}>
                <td>{customer.CustomerCode}</td>
                <td>{customer.Name}</td>
                <td>{customer.Email}</td>
                <td>{customer.Phone}</td>
                <td>{customer.Address}</td>
                <td>{customer.Custype}</td>
                <td>
                  {customer.OpenBalance}
                  {customer.BalanceType && ` (${customer.BalanceType})`}
                </td>
                <td>{customer.SalesPerson}</td>
                <td className="actions-cell">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      // Pass the entire customer object to the parent's onEdit handler
                      onEdit(customer);
                    }}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      try {
                        // Call parent's onDelete and wait for confirmation
                        await onDelete(customer._id);
                        // Refresh the list after successful deletion
                        setRefreshTrigger((prev) => prev + 1);
                      } catch (error) {
                        setError("Failed to delete customer");
                      }
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalCustomers}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onCustomLimitSubmit={handleCustomLimit}
      />
    </div>
  );
};

export default CustomersList;
