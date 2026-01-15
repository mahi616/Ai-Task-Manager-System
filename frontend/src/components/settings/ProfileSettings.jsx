import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { fetchSettings } from "../../redux/settingsSlice";
import { updateProfile } from "../../api/settingsApi";
import { saveProfile } from "../../redux/settingsSlice";



export default function ProfileSettings() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.settings);


  const [name, setName] = useState("");
  const [bio, setBio] = useState(""); // agar backend me bio store hai
  const [email, setEmail] = useState("");

  // Fetch user settings from backend when component mounts
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Update local state when Redux store updates
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setBio(profile.bio || ""); // agar bio store nahi hai, remove this
    }
  }, [profile]);

  const handleSave = () => {
    dispatch(saveProfile({ name }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm mb-1 text-gray-300">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm mb-1 text-gray-300">Email</label>
        <input
          value={email}
          disabled
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 opacity-60"
        />
      </div>

      {/* Bio */}
      {/* <div className="mb-6">
        <label className="block text-sm mb-1 text-gray-300">Bio</label>
        <textarea
          rows="4"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        />
      </div> */}

      <button
        onClick={handleSave}
        className="px-5 py-2 bg-purple-600 rounded hover:bg-purple-700"
      >
        Save Changes
      </button>
    </div>
  );
}
