import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCurrentUser,
  refreshAccessToken,
  signInUser,
  signOutUser,
} from "../FetchApi";
import { jwtDecode } from "jwt-decode"; // Make sure to install this: npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Function to decode JWT and set user
  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      setUser(decoded.userForToken);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
      return null;
    }
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    } catch {
      return true; // If there's an error, consider the token expired
    }
  };

  // Fetch user data on app load (e.g., after a refresh or reopening the app)
  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      console.log("Checking for token...");
      const token = localStorage.getItem("accessToken");
      console.log("Token found: ", token);

      if (!token) {
        setLoading(false);
        return;
      }

      // Token exists but might be expired
      if (isTokenExpired(token)) {
        try {
          // Try to refresh the token
          const response = await refreshAccessToken();
          const newToken = response.payload.accessToken;
          localStorage.setItem("accessToken", newToken);
          decodeAndSetUser(newToken);
        } catch (error) {
          console.error("Token refresh failed:", error);
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      } else {
        // Token is still valid
        decodeAndSetUser(token);
      }

      setLoading(false);
    };
    getCurrentUser();
  }, []);

  // Login function called when user submits login form
  const login = async (credentials) => {
    try {
      const data = await signInUser(credentials); // Call the login API

      const { accessToken } = data.payload; // Get the access token from the response
      localStorage.setItem("accessToken", accessToken); // Store the token in local storage

      // Decode token and set user
      decodeAndSetUser(accessToken);

      console.log("Login successful and context set ", data.payload.user);

      navigate("/"); // Redirect to another page after login

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Clear token and user regardless of API response
    localStorage.removeItem("accessToken");
    setUser(null);

    // Redirect to login page
    window.location.href = "/";
  };

  // Function to get a new access token if expired
  const getValidAccessToken = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found");
    }

    if (isTokenExpired(token)) {
      try {
        const response = await refreshAccessToken();
        const newToken = response.payload.accessToken;
        localStorage.setItem("accessToken", newToken);
        return newToken;
      } catch (error) {
        // If refresh fails, clear token and user
        localStorage.removeItem("accessToken");
        setUser(null);
        throw error;
      }
    }

    return token;
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, getValidAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
