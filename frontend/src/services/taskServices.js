import axiosInstance from "../api/axios";

// Fetch all tasks for the logged-in user
export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data.tasks; // backend response { tasks: [...] }
};

// Create a new task
export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/tasks", taskData);
  return res.data.task; // backend response { task: {...} }
};

// Update a task
export const updateTask = async (id, taskData) => {
  const res = await axiosInstance.put(`/tasks/${id}`, taskData);
  return res.data.task; // backend response { task: {...} }
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data.message; // backend response { message: "Task deleted successfully" }
};
