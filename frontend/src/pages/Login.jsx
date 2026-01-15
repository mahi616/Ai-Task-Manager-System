import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }else{
      navigate('/dashboard');
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call backend API
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Update Redux
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        })
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));


      setMsg("Login successful!");

      // Redirect
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-850 p-8 rounded-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

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

        <button
          type="submit"
          className="bg-purple-600 py-2 rounded-md text-white font-semibold"
        >
          Login
        </button>

        {msg && <p className="text-center text-sm mt-2">{msg}</p>}
      </form>
    </div>
  );
}
