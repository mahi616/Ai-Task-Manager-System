import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true); 

    try {
      const data = await registerUser(name, email, password);
      console.log("Registered:", data);
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMsg(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-850 p-8 rounded-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md bg-gray-800/50"
          required
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md bg-gray-800/50"
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md bg-gray-800/50"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded-md text-white font-semibold flex items-center justify-center gap-2
            ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600"}`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        {msg && <p className="text-sm text-center mt-2">{msg}</p>}
      </form>
    </div>
  );
}
