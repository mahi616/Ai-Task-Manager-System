// src/components/TaskModal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAiSuggestion } from "../api/settingsApi";

export default function TaskModal({
  task,
  onClose,
  onSave,
  isOpen,
  redirectTo,
}) {
  if (!isOpen) return null;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [due, setDue] = useState(task?.due || "");
  const [column, setColumn] = useState(task?.column || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setPriority(task?.priority || "Medium");
    setColumn(task?.column || "todo");

    if (task?.due) {
      const d = new Date(task.due);
      const formatted = d.toISOString().split("T")[0];
      setDue(formatted);
    } else {
      setDue("");
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title) return alert("Title is required");

    const newTask = {
      ...task,
      title,
      description,
      priority,
      due,
      column,
      id: task?.id || Date.now().toString(),
    };

    onSave(newTask);
    onClose();
    if (redirectTo) navigate(redirectTo);
  };

  const handleAISuggestion = async () => {
    try {
      setIsLoading(true);
      const res = await getAiSuggestion({ title });
      const aiData = res.data.data;

      if (aiData.title) setTitle(aiData.title);
      if (aiData.description) setDescription(aiData.description);
    } catch (error) {
      alert("AI suggestion failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-6 md:p-8 rounded-xl w-full max-w-lg md:max-w-xl
                   max-h-[90vh] overflow-y-auto
                   shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
          {task ? "Edit Task" : "Create New Task"}
        </h3>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-medium">Title</label>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-medium">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg text-white bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-medium">
            Due Date
          </label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="w-full p-3 rounded-lg text-white bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Column */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1 font-medium">Column</label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="w-full p-3 text-white rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-1 font-medium">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 text-white rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
          <button
            onClick={handleAISuggestion}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "AI Suggestion"
            )}
          </button>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition"
            >
              {task ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
