const axios = require("axios");
const { configDotenv } = require("dotenv");

const env = configDotenv().parsed;
const apiURL = env.apiURL;
const apiKey = env.NEWS_API_KEY;

// Fetch news based on user preferences
const fetchNews = async (req, res) => {
  try {
    let user = req.user;
    let preferences = [];
    if (!!user.preferences.length) {
      preferences = req.user.preferences;
    }
    const response = await axios.get(apiURL, {
      params: {
        apiKey,
        category: preferences,
        country: "in", // India
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = fetchNews;
