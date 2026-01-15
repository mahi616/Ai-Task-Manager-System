import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as settingsApi from "../api/settingsApi";

// Fetch settings from backend
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await settingsApi.getSettings();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update preferences (darkMode, emailNotifications)
export const savePreferences = createAsyncThunk(
  "settings/savePreferences",
  async (prefs, { rejectWithValue }) => {
    try {
      const res = await settingsApi.updatePreferences(prefs);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update profile (name, email)
export const saveProfile = createAsyncThunk(
  "settings/saveProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await settingsApi.updateProfile(profileData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update password
export const changePassword = createAsyncThunk(
  "settings/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const res = await settingsApi.changepassword(passwordData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    profile: { name: "", email: "" },
    preferences: { darkMode: true, emailNotifications: false },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.preferences = action.payload.preferences || {};
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save Preferences
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save Profile
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default settingsSlice.reducer;
