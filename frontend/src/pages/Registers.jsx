import React, { useState } from "react";
import { registerUser } from "../services/authService"; // service import
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(name, email, password);
      console.log("Registered:", data);
      alert("Registration Successful!");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <form onSubmit={handleSubmit} className="bg-gray-850 p-8 rounded-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md bg-gray-800/50"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md bg-gray-800/50"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md bg-gray-800/50"
          required
        />

        <button type="submit" className="bg-purple-600 py-2 rounded-md text-white font-semibold">
          Register
        </button>

        {msg && <p className="text-sm text-center">{msg}</p>}
      </form>
    </div>
  );
}
