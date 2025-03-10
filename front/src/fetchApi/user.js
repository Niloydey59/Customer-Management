import api from "./base";

export const updatePassword = async (formData, userId) => {
  try {
    const response = await api.put(
      `/users/update-password/${userId}`,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateUserProfile = async (formData, userId) => {
  try {
    const response = await api.put(`/users/update-profile/${userId}`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
