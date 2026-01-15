// MainLayout.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const [currentPage, setCurrentPage] = useState("Dashboard"); // default page

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Sidebar setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-6">
        <Navbar currentPage={currentPage} />
      </main>
    </div>
  );
}
