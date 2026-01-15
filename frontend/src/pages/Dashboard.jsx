// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import axiosInstance from "../api/axios";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskServices";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="h-screen bg-gray-900 text-gray-100 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar toggleDark={() => setDark(!dark)} />

        {/* Main */}
        <main className="flex-1 flex flex-col p-4 sm:p-6">
          {/* Navbar - FIXED */}
          <Navbar search={search} setSearch={setSearch} />

          {/* Header - FIXED */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">My Tasks</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-purple-600 rounded-md text-white w-full sm:w-auto"
            >
              + Add Task
            </button>
          </div>

          {/* TASK LIST - SCROLLABLE */}
          <div className="flex-1 overflow-y-auto pr-1">
            {filteredTasks.length === 0 ? (
              <p className="mt-10 text-center text-gray-400">No tasks found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTask(null);
        }}
        onSave={async (taskData) => {
          if (taskData._id) {
            const updatedTask = await updateTask(taskData._id, taskData);
            setTasks((prev) =>
              prev.map((t) => (t._id === taskData._id ? updatedTask : t))
            );
          } else {
            const newTask = await createTask(taskData);
            setTasks((prev) => [newTask, ...prev]);
          }
          setModalOpen(false);
          setEditTask(null);
        }}
        task={editTask}
        redirectTo="/dashboard"
      />
    </div>
  );
}
