import api from "./base";

export const signInUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    //console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("SignIn error:", error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

export const signOutUser = async () => {
  try {
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("SignOut error:", error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post("/auth/refresh-token", { refreshToken });

    //console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Token refresh error:",
      error.response?.data || error.message
    );
    throw error.response?.data || { message: error.message };
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/auth/current-user");
    return response.data;
  } catch (error) {
    console.error(
      "Get current user error:",
      error.response?.data || error.message
    );
    throw error.response?.data || { message: error.message };
  }
};
