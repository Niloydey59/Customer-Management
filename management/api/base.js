// api/base.js
import axios from "axios";

const API_URL = "http://192.168.31.90:3001/api"; // Use your computer's IP address instead of localhost

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-platform": "mobile", // Add this to identify mobile requests
  },
});

// Error handler function
export const handleApiError = (error) => {
  if (error.response) {
    return {
      message: error.response.data.message || "Something went wrong.",
      status: error.response.status,
    };
  } else if (error.request) {
    return { message: "No response from server.", status: null };
  } else {
    return { message: error.message, status: null };
  }
};

export default api;
