const { Router } = require("express");
const {
  updatePreferences,
  getUserPreferences,
} = require("../controllers/preferencesController");

const router = Router();

router.get("/", getUserPreferences);
router.put("/", updatePreferences);

module.exports = router;
