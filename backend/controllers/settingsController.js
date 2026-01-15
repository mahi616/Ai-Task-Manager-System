const User = require("../models/User");
const bcrypt = require("bcrypt")

// GET user settings
const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("name email preferences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// UPDATE preferences
const updatePreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.darkMode !== undefined) {
      user.preferences.darkMode = req.body.darkMode;
    }

    if (req.body.emailNotifications !== undefined) {
      user.preferences.emailNotifications = req.body.emailNotifications;
    }

    await user.save();

    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Failed to update preferences" });
  }
};

// UPDATE profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const emailExists = await User.findOne({ email, _id: { $ne: req.user } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(
      req.user,
      { name, email },
      { new: true }
    ).select("name email");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Update password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Both passwords are required" });
  }

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password (agar bcrypt use kiya hai)
    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Failed to update password" });
  }
};

module.exports = {
  getSettings,
  updatePreferences,
  updateProfile,
  changePassword,
};
