// src/pages/Board.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskServices";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Completed" },
];

export default function Board() {
  const [dark, setDark] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
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

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const task = tasks.find((t) => t._id === draggableId);
    if (!task) return;

    const updatedTask = { ...task, column: destination.droppableId };

    try {
      await updateTask(draggableId, updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t._id === draggableId ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task column:", error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSave = async (task) => {
    try {
      if (task._id) {
        const updated = await updateTask(task._id, task);
        setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
      } else {
        const newTask = await createTask(task);
        setTasks((prev) => [...prev, newTask]);
      }
      setModalOpen(false);
      setEditTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex">
        <Sidebar toggleDark={() => setDark(!dark)} />

        {/* MAIN — page scroll only on small/medium */}
        <main className="flex-1 h-screen flex flex-col bg-gray-900">
          {/* 🔒 FIXED HEADER */}
          <div className="p-4 lg:p-6 border-b border-gray-800 shrink-0">
            <Navbar search={search} setSearch={setSearch} />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
              <h2 className="text-lg sm:text-xl font-semibold">Kanban Board</h2>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-purple-600 px-4 py-2 rounded-md text-white"
              >
                + New Task
              </button>
            </div>
          </div>

          {/* 🔥 ONLY THIS AREA SCROLLS */}
          {/* 🔥 ONLY THIS AREA SCROLLS */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {columns.map((col) => (
                  <Droppable key={col.id} droppableId={col.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-gray-800 rounded-lg flex flex-col h-[70vh]"
                      >
                        {/* COLUMN HEADER FIXED */}
                        <div className="font-semibold p-3 border-b border-gray-700 shrink-0">
                          {col.title}
                        </div>

                        {/* TASK LIST SCROLL */}
                        <div className="flex-1 overflow-y-auto p-3">
                          {tasks
                            .filter((t) => t.column === col.id)
                            .filter(
                              (t) =>
                                t.title
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                (t.description &&
                                  t.description
                                    .toLowerCase()
                                    .includes(search.toLowerCase()))
                            )
                            .map((task, index) => (
                              <Draggable
                                key={task._id}
                                draggableId={task._id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                  >
                                    <TaskCard
                                      task={task}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </div>
        </main>
      </div>

      {modalOpen && (
        <TaskModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditTask(null);
          }}
          onSave={handleSave}
          task={editTask}
          redirectTo="/board"
        />
      )}
    </div>
  );
}
