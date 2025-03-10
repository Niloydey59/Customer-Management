import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, signInUser, signOutUser } from "../FetchApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on app load (e.g., after a refresh or reopening the app)
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetchCurrentUser(); // Fetch current user data from the backend
        console.log("Current user data:", response.payload.user);
        setUser(response.payload.user);
      } catch (error) {
        console.error("Error fetching user data", error);
        setUser(null);
      }
    };
    getCurrentUser();
  }, []);

  // Login function called when user submits login form
  const login = async (credentials) => {
    try {
      const data = await signInUser(credentials); // Call the login API

      setUser(data.payload.user); // Set user in context

      console.log("Login successful and context set ", data.payload.user);

      navigate("/"); // Redirect to another page after login

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function to clear the context
  const logout = async () => {
    setUser(null);
    await signOutUser(); // Call the logout API
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
