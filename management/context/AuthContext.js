import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInUser, signOutUser } from "../api/auth";
import api from "../api/base";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error("Error loading user from storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Listen for new access tokens in response headers
  api.interceptors.response.use(
    (response) => {
      const newToken = response.headers["x-new-access-token"];
      if (newToken) {
        AsyncStorage.setItem("accessToken", newToken);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async (credentials) => {
    try {
      console.log("On Authcontext login");
      const response = await signInUser(credentials);
      console.log("response", response);
      const userData = response.payload.user;

      // Store user data in AsyncStorage for persistence
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      // Store access and refresh tokens
      await AsyncStorage.setItem("accessToken", response.payload.accessToken);
      await AsyncStorage.setItem("refreshToken", response.payload.refreshToken);

      // Update state
      setUser(userData);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      // Clear all stored data
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the API call fails, clear local storage
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  // Function to get current user info
  const getCurrentUser = async () => {
    try {
      const response = await api.get("/auth/current-user");
      const userData = response.data.payload.user;

      // Update stored user data
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching current user:", error);
      // If unauthorized, clear user data
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("user");
        setUser(null);
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        getCurrentUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthMob = () => useContext(AuthContext);
