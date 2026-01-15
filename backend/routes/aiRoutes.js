const express = require("express");
const router = express.Router();
const { aiSuggest } = require("../controllers/aiController");

router.post("/suggest", aiSuggest);

module.exports = router;
