import React, { useState, useEffect } from "react";
import CustomersList from "./customers/customersList";
import CustomerForm from "./customers/customerForm";
import {
  getCustomers,
  getFilterOptions,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../fetchApi/customer";

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async (params = {}) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getCustomers(params);
      if (data && data.customers) {
        setCustomers(data.customers);
        // Update total customers from pagination data
        setTotalCustomers(data.pagination.total);
        setPagination(data.pagination);
      } else {
        throw new Error("Invalid data received from server");
      }
    } catch (err) {
      console.error("Error in fetchCustomers:", err);
      setError(err.message || "Failed to fetch customers");
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomer = async (customerData) => {
    try {
      const { customer } = await createCustomer(customerData);
      setCustomers([...customers, customer]);
      setIsAddingCustomer(false);
      return true;
    } catch (error) {
      setError(error.message || "Failed to add customer");
      return false;
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsAddingCustomer(true);
  };

  const handleUpdateCustomer = async (updatedData) => {
    try {
      console.log("updatedData", updatedData);
      const { customer } = await updateCustomer(
        editingCustomer._id,
        updatedData
      );
      const updatedCustomers = customers.map((c) =>
        c._id === customer._id ? customer : c
      );
      setCustomers(updatedCustomers);
      setIsAddingCustomer(false);
      setEditingCustomer(null);
      return true;
    } catch (error) {
      setError(error.message || "Failed to update customer");
      return false;
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return false;
    }

    try {
      await deleteCustomer(customerId);
      const filteredCustomers = customers.filter(
        (customer) => customer._id !== customerId
      );
      setCustomers(filteredCustomers);
      return true;
    } catch (error) {
      setError(error.message || "Failed to delete customer");
      return false;
    }
  };

  const handleFetchFilterOptions = async () => {
    try {
      const filterOptions = await getFilterOptions();
      return filterOptions;
    } catch (error) {
      setError("Failed to load filter options");
      return null;
    }
  };

  return (
    <div className="customers-management">
      {isAddingCustomer ? (
        <CustomerForm
          onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
          onCancel={() => {
            setIsAddingCustomer(false);
            setEditingCustomer(null);
          }}
          initialData={editingCustomer}
          onFetchFilterOptions={handleFetchFilterOptions}
        />
      ) : (
        <>
          <div className="customers-header">
            <h2>Customers</h2>
            <button
              className="add-customer-btn"
              onClick={() => setIsAddingCustomer(true)}
            >
              Add New Customer
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <CustomersList
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            onFetchCustomers={fetchCustomers}
            onFetchFilterOptions={handleFetchFilterOptions}
            isLoading={isLoading}
            error={error}
            pagination={pagination}
            totalCustomers={totalCustomers}
          />
        </>
      )}
    </div>
  );
};

export default CustomersManagement;
