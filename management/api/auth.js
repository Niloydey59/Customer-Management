// api/auth.js
import api from "./base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signInUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log(response.data.payload.accessToken);
    // Store tokens in AsyncStorage instead of cookies
    await AsyncStorage.setItem(
      "accessToken",
      response.data.payload.accessToken
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    const response = await api.get("/auth/logout");
    // Clear stored tokens
    await AsyncStorage.removeItem("accessToken");
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const welcomeMessege = async () => {
  try {
    console.log("Welcome message function called");
    const response = await api.get("/");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Other auth methods...
