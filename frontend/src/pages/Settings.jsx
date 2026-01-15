import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettings,
  saveProfile,
  savePreferences,
} from "../redux/settingsSlice"; // make sure this slice exists
import ProfileSettings from "../components/settings/ProfileSettings";
import AccountSettings from "../components/settings/AccountSettings";
// import AppPreferences from "../components/settings/AppPreferences";

export default function Settings() {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const { profile, preferences, loading } = settings;

  // Fetch user settings once
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Handler functions
  const handleSaveProfile = (data) => {
    dispatch(saveProfile(data));
  };

  const handleSavePreferences = (data) => {
    dispatch(savePreferences(data));
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar toggleDark={() => setDark(!dark)} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden p-4 sm:p-6">
          <Navbar />

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 border-b border-gray-700 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-2 ${
                activeTab === "profile"
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              Profile
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`pb-2 ${
                activeTab === "account"
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              Account
            </button>

            {/* <button
          onClick={() => setActiveTab("preferences")}
          className={`pb-2 ${
            activeTab === "preferences"
              ? "border-b-2 border-purple-500 text-purple-400"
              : "text-gray-400"
          }`}
        >
          Preferences
        </button> */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "profile" && (
              <ProfileSettings profile={profile} onSave={handleSaveProfile} />
            )}

            {activeTab === "account" && <AccountSettings />}

            {/* {activeTab === "preferences" && (
          <AppPreferences
            preferences={preferences}
            onSave={handleSavePreferences}
          />
        )} */}
          </div>
        </main>
      </div>
    </div>
  );
}
