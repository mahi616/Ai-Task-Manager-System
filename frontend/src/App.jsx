// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./pages/MainLayout"; // Wrap dashboard/board
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Register from "./pages/Registers";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { fetchSettings } from "./redux/settingsSlice";

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  const dispatch = useDispatch();

  const darkMode = useSelector(
    (state) => state.settings.preferences?.darkMode
  );
  console.log(darkMode);
  
  useEffect(()=>{
    dispatch(fetchSettings());
  },[dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/board" element={<Board />} />
        <Route
          path="/settings"
          element={
            // <ProtectedRoute>
              <Settings />
            /* </ProtectedRoute> */
          }
        />
      </Routes>
    </Router>
  );
}
