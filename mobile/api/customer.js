import api from "./base";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCustomers = async (params = {}) => {
  try {
    const response = await api.get("/customers", { params });
    //console.log("Customers fetched successfully:", response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    throw error;
  }
};

// Get filter options for the customer dropdowns
export const getFilterOptions = async () => {
  try {
    const response = await api.get("/customers/filter-options");
    const { filterOptions } = response.data.payload;
    return {
      CustomerCodes: filterOptions.CustomerCodes || [],
      Custypes: filterOptions.Custypes || [],
      ZoneIDs: filterOptions.ZoneIDs || [],
      AreaIDs: filterOptions.AreaIDs || [],
      SalesPersons: filterOptions.SalesPersons || [],
    };
  } catch (error) {
    console.error("Error fetching filter options:", error.message);
    throw error;
  }
};

// Get a single customer by ID
export const getCustomerById = async (customerId) => {
  try {
    const response = await api.get(`/customers/detail/${customerId}`);
    return response.data.payload;
  } catch (error) {
    console.error(`Error fetching customer ${customerId}:`, error.message);
    throw error;
  }
};

// Create a new customer
export const createCustomer = async (customerData) => {
  try {
    const response = await api.post("/customers/create", customerData);
    console.log("Customer created successfully:", response.data);
    return response.data.payload;
  } catch (error) {
    console.error("Error creating customer:", error.message);
    throw error;
  }
};

// Update an existing customer
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await api.put(`/customers/${customerId}`, customerData);
    console.log("Customer updated successfully:", response.data);
    return response.data.payload;
  } catch (error) {
    console.error(`Error updating customer ${customerId}:`, error.message);
    throw error;
  }
};

// Delete a customer
export const deleteCustomer = async (customerId) => {
  try {
    const response = await api.delete(`/customers/${customerId}`);
    console.log("Customer deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer ${customerId}:`, error.message);
    throw error;
  }
};
