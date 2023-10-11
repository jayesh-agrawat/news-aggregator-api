const getUserPreferences = (req, res) => {
  const preferences = req.user.preferences;
  if (preferences.length > 0) {
    res.status(200).json(preferences);
  } else {
    res.status(404).json({ message: "User preferences not found" });
  }
};

const updatePreferences = (req, res) => {
  const user = req.user;
  const updatedPreferences = req.body;
  user.preferences = updatedPreferences;
  res.status(200).json({ message: "User preferences updated successfully" });
};

module.exports = {
  getUserPreferences,
  updatePreferences,
};
