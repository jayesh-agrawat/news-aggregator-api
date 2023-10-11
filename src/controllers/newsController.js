const axios = require("axios");
const apiKey = process.env.NEWS_API_KEY;
var cache = require("../data/cache");

// Fetch news based on user preferences
exports.fetchNews = async (req, res) => {
  try {
    // Get user preferences, you can replace this with your preference retrieval logic
    const userId = req.userData.userId;
    const preferences = userPreferences.find((pref) => pref.userId === userId);

    if (!preferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    const { categories } = preferences.preferences;

    // Fetch news articles from an external API like NewsAPI
    const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&sources=${sources.join(
      ","
    )}&category=${categories.join(",")}`;
    const response = await axios.get(apiUrl);

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};
