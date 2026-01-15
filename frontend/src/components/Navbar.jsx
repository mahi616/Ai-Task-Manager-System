// src/components/Navbar.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar({ search, setSearch }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { profile } = useSelector((state) => state.settings);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
      {/* On small screens: name first */}
      <div className="flex flex-col sm:flex-row sm:items-center pt-15 sm:pt-5 gap-3 w-full sm:w-auto">

        <h1 className="text-sm sm:text-base text-gray-200 order-1 sm:order-2">
          Hello, {profile?.name || user.name}
        </h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks, tags..."
          className="bg-gray-800/60 rounded-md px-3 py-2 text-sm outline-none w-full sm:w-64  order-2 sm:order-1"
        />
      </div>
    </div>
  );
}
