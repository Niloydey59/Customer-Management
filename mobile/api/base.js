// api/base.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { refreshAccessToken } from "./auth";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://192.168.31.90:3001/api"; // Use your computer's IP address instead of localhost

const noInterceptorApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-platform": "mobile",
  },
});

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-platform": "mobile", // Add this to identify mobile requests
  },
});

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // If there's an error, consider the token expired
  }
};

// Implement refresh function directly to avoid circular imports
const refreshTokenFunction = async (refreshToken) => {
  try {
    console.log("Refreshing token...");
    const response = await noInterceptorApi.post("/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Add request interceptor to add auth token to all requests
api.interceptors.request.use(async (config) => {
  let token = await AsyncStorage.getItem("accessToken");

  if (token) {
    if (isTokenExpired(token)) {
      console.log("Token expired");
      console.log("Interceptor calling refresh token function");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.log("No refresh token found so returning config");
        return config;
      }

      const response = await refreshTokenFunction(refreshToken);
      token = response.payload.accessToken;
      await AsyncStorage.setItem("accessToken", token);
      // Handle token refresh
      console.log("Token refreshed");
    }
    console.log("Token found");

    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("No token found");
    config.headers.Authorization = null;
  }
  return config;
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
