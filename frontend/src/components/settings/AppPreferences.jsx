import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettings,
  savePreferences,
} from "../../redux/settingsSlice";

export default function AppPreferences() {
  const dispatch = useDispatch();

  const { preferences = {}, loading } = useSelector(
    (state) => state.settings
  );

  // fetch preferences on mount
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleToggle = (key) => {
    if (loading) return;

    dispatch(
      savePreferences({
        ...preferences,
        [key]: !preferences[key],
      })
    );
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-6">App Preferences</h2>

      {/* Dark Mode */}
      <div className="flex justify-between mb-4">
        <span>Dark Mode</span>
        <input
          type="checkbox"
          checked={!!preferences.darkMode}
          onChange={() => handleToggle("darkMode")}
          disabled={loading}
        />
      </div>

      {/* Email Notifications */}
      <div className="flex justify-between mb-4">
        <span>Email Notifications</span>
        <input
          type="checkbox"
          checked={!!preferences.emailNotifications}
          onChange={() => handleToggle("emailNotifications")}
          disabled={loading}
        />
      </div>
    </div>
  );
}
