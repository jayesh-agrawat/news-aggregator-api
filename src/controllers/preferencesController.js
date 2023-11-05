const User = require("../models/userSchema");

const getUserPreferences = async (req, res) => {
  let userPreference = "";
  await User.findOne({
    _id: req.user,
  }).then((user) => {
    userPreference = user.preferences;
  });

  if (userPreference.length > 0) {
    res.status(200).json({ preference: userPreference });
  } else {
    res.status(404).json({ message: "User preferences not found" });
  }
};

const updatePreferences = async (req, res) => {
  const validPreferences = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const preference = req.body.preference;
  if (!validPreferences.includes(preference)) {
    return res.status(400).json({
      message:
        "Valid preferences are required [business,entertainment,general,health,science,sports,technology]",
    });
  }

  await User.updateOne(
    {
      _id: req.user,
    },
    {
      preferences: preference,
    }
  )
    .then((user) => {
      res
        .status(200)
        .json({ message: "User preferences updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

module.exports = {
  getUserPreferences,
  updatePreferences,
};
