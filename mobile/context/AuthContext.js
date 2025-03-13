import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // Make sure to install: npm install jwt-decode
import {
  signInUser,
  signOutUser,
  refreshAccessToken,
  fetchCurrentUser,
} from "../api/auth";
import api from "../api/base";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to decode JWT and set user
  const decodeAndSetUser = (token) => {
    try {
      //console.log("Decoding token...");
      const decoded = jwtDecode(token);
      setUser(decoded.user);
      console.log("User set");
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
      return null;
    }
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    } catch {
      return true; // If there's an error, consider the token expired
    }
  };

  // Load user from token on app start
  useEffect(() => {
    const getCurrentUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCurrentUser();
        console.log("Current user response:", response);
        const user = response.payload.user;
        setUser(user);
        console.log("Current user set:", user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const login = async (credentials) => {
    try {
      console.log("Logging in...");
      const response = await signInUser(credentials);
      console.log("Login successful");

      const { accessToken, refreshToken, user } = response.payload;

      // Store access token
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      // Decode and set user
      decodeAndSetUser(accessToken);

      return response;
    } catch (error) {
      console.error("Login failed:", error.message || error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      await signOutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always clear token and user
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  // Function to manually refresh token
  const handleRefreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      if (isTokenExpired(refreshToken)) {
        console.log("Refresh token expired, user must login again");
        throw new Error("Refresh token expired");
      }

      console.log("Refreshing token...");
      const response = await refreshAccessToken(refreshToken);
      const newToken = response.payload.accessToken;

      // Store new token
      await AsyncStorage.setItem("accessToken", newToken);
      console.log("Token refreshed successfully");
    } catch (error) {
      console.error("Manual token refresh failed:", error);
      await AsyncStorage.removeItem("accessToken");
      setUser(null);
      throw error;
    }
  };

  // Function to get current token, refreshing if needed
  const getValidAccessToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("Checking token...");
    if (!token) {
      throw new Error("No access token found");
    }

    if (isTokenExpired(token)) {
      console.log("Token expired, refreshing...");
      return handleRefreshToken();
    }
    console.log("Token is valid so returning it");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        login,
        logout,
        refreshToken: handleRefreshToken,
        getValidAccessToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
