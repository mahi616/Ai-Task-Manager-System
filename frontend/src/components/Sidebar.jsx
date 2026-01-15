import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setCurrentPage, toggleDark }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavigate = (pageName, route) => {
    setCurrentPage(pageName);
    navigate(route);
    setIsOpen(false); // mobile me click pe sidebar band
  };

  return (
    <>
      {/* ☰ Hamburger (mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 w-72 bg-gray-900 border-r border-gray-600 min-h-screen p-6 flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">
            TM
          </div>
          <div>
            <div className="text-lg font-semibold">TaskManager</div>
            <div className="text-xs text-gray-400"></div>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            <li
              className="px-3 py-2 rounded-md hover:bg-gray-800/30 cursor-pointer"
              onClick={()=>(
              navigate('/dashboard'),
              setCurrentPage('Dashboard')
            )}
            >
              Dashboard
            </li>
            <li
              className="px-3 py-2 rounded-md hover:bg-gray-800/30 cursor-pointer"
              onClick={()=>(
              navigate('/board'),
              setCurrentPage('Board')
            )}
            >
              Board
            </li>
            <li
              className="px-3 py-2 rounded-md hover:bg-gray-800/30 cursor-pointer"
              onClick={()=>(
              navigate('/settings'),
              setCurrentPage('Setting')
            )}
            >
              Settings
            </li>
          </ul>
        </nav>

        {/* Logout bottom */}
        <div className="mt-6">
          <h1
            className="w-full py-2 px-4 rounded-md bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white font-semibold"
            onClick={handleLogout}
          >
            Logout
          </h1>
        </div>
      </aside>
    </>
  );
}
