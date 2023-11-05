const axios = require("axios");
const { configDotenv } = require("dotenv");
const User = require("../models/userSchema");

const env = configDotenv().parsed;
const apiURL = env.NEWS_API_URL;
const apiKey = env.NEWS_API_KEY;

// Fetch news based on user preferences
const fetchNews = async (req, res) => {
  let userPreference, userCountry;
  await User.findOne({
    _id: req.user,
  }).then((user) => {
    userPreference = user.userPreferences;
    userCountry = user.country;
  });

  axios
    .get(apiURL, {
      params: {
        apiKey,
        country: userCountry,
        category: userPreference,
      },
    })
    .then((data) => {
      return res.status(200).json(data.data);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Failed to fetch news" });
    });
};

module.exports = fetchNews;
