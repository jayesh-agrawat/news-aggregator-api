const { Router } = require("express");
const router = Router();

const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferencesController");
