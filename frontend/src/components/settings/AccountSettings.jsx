import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changePassword} from "../../redux/settingsSlice"

export default function AccountSettings() {
  const dispatch = useDispatch();
  const {loading,error} = useSelector((state)=> state.settings);

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [successMsg, setSuccessMsg] = useState("")

  const handleUpdate = async () => {
    if (newPass !== confirm) return alert("Passwords do not match");

    setSuccessMsg("");
    try {
      const res = await dispatch(changePassword({ currentPassword: current, newPassword: newPass })).unwrap();
      setSuccessMsg(res.message); // ✅ proper way to get response
      setCurrent(""); setNewPass(""); setConfirm("");
    } catch (err) {
      console.log(err); // error message from backend
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-700"
      />
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-5 py-2 bg-purple-600 rounded hover:bg-purple-700"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}
