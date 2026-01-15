const express = require("express");
const {
  getSettings,
  updatePreferences,
  updateProfile,
  changePassword,
} = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getSettings);
router.put("/preferences", protect, updatePreferences);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;
