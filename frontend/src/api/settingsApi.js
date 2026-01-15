import axiosInstance from "./axios";

// get settings
export const getSettings = () => {
  return axiosInstance.get("/settings");
};

// update preferences
export const updatePreferences = (data) => {
  return axiosInstance.put("/settings/preferences", data);
};

// update profile
export const updateProfile = (data) => {
  return axiosInstance.put("/settings/profile", data);
};

export const changepassword = (data) => {
  return axiosInstance.put("/settings/change-password", data);
};

export const getAiSuggestion = (data) => {
  return axiosInstance.post("/ai/suggest", data)
}