// api/base.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//import { useAuth } from "../context/AuthContext";

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

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // If there's an error, consider the token expired
  }
};

// Add request interceptor to add auth token to all requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  //const getValidAccessToken = useAuth();
  if (token) {
    //getValidAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    //console.log("Token found and added to request");
    //console.log("Token: ", token);
    //console.log("Config: ", config.headers.Authorization);
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
