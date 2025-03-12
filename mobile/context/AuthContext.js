import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // Make sure to install: npm install jwt-decode
import { signInUser, signOutUser, refreshAccessToken } from "../api/auth";
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
    const loadUserFromToken = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
          setIsLoading(false);
          return;
        }

        // Check if token is expired
        if (isTokenExpired(token)) {
          try {
            // Try to refresh token
            console.log("Token expired, trying to refresh...");
            const response = await refreshAccessToken();
            const newToken = response.payload.accessToken;

            // Store new token
            await AsyncStorage.setItem("accessToken", newToken);

            // Decode and set user from new token
            decodeAndSetUser(newToken);
          } catch (error) {
            console.error("Failed to refresh token:", error);
            await AsyncStorage.removeItem("accessToken");
            setUser(null);
          }
        } else {
          // Token is valid, decode and set user
          decodeAndSetUser(token);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromToken();
  }, []);

  const login = async (credentials) => {
    try {
      console.log("Logging in...");
      const response = await signInUser(credentials);
      console.log("Login successful");

      const { accessToken, user } = response.payload;

      // Store access token
      await AsyncStorage.setItem("accessToken", accessToken);

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
      setUser(null);
    }
  };

  // Function to manually refresh token
  const handleRefreshToken = async () => {
    try {
      const response = await refreshAccessToken();
      const newToken = response.payload.accessToken;

      await AsyncStorage.setItem("accessToken", newToken);

      decodeAndSetUser(newToken);
      console.log("Token refreshed successfully");
      return newToken;
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
    return token;
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
