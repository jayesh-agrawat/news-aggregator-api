var cache = require("../data/cache");

const getUserPreferences = (req, res) => {
  const userId = req.userData.userId;
  const preferences = userPreferences.find((pref) => pref.userId === userId);
  if (preferences) {
    res.status(200).json(preferences);
  } else {
    res.status(404).json({ message: "User preferences not found" });
  }
};

const updatePreferences = (req, res) => {
  const userId = req.userData.id;
  const updatedPreferences = req.body;

  let userIndex = userPreferences.findIndex((pref) => pref.userId === userId);

  if (userIndex === -1) {
    // If user's preferences don't exist, create a new entry
    userPreferences.push({ userId, preferences: updatedPreferences });
  } else {
    // Update the existing entry
    userPreferences[userIndex].preferences = updatedPreferences;
  }

  res.status(200).json({ message: "User preferences updated successfully" });
};

module.exports = {
  getUserPreferences,
  updatePreferences,
};
