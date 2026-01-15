// src/components/TaskCard.jsx
import React from "react";

function PriorityBadge({ priority }) {
  const cls = priority === "High" ? "bg-red-600 text-white" : priority === "Medium" ? "bg-yellow-500 text-black" : "bg-green-600 text-white";
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`}>{priority}</span>;
}

export default function TaskCard({ task, onEdit, onDelete }) {

  const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

  return (
    <div className="p-3 bg-gray-800/30 rounded-md cursor-grab hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-sm">{task.title}</div>
            <PriorityBadge priority={task.priority} />
          </div>
          <div className="text-xs text-gray-400 mt-1">{task.description}</div>
          {task.due ?(
            <div className="text-xs text-gray-500 mt-2">Due: {formatDate(task.due)}</div>
          ):
          (
            <h2 className="text-xs text-gray-500 mt-2">No Due</h2>
          )
        }
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button onClick={() => onEdit(task)} className="text-xs px-2 py-1 rounded bg-gray-700/40">Edit</button>
          <button onClick={() => onDelete(task._id)} className="text-xs px-2 py-1 rounded bg-red-700/40">Del</button>
        </div>
      </div>
    </div>
  );
}
