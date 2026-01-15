import axiosInstance from "../api/axios";

export const loginUser = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};
