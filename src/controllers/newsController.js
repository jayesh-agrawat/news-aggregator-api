const axios = require("axios");

var cache = require("../data/cache");
const { configDotenv } = require("dotenv");

const env = configDotenv().parsed;
const apiKey = env.NEWS_API_KEY;
// Fetch news based on user preferences
var fetchNews = async (req, res) => {
  try {
    let preferences = [];
    // if (!!req.user.preferences.length) {
    //   preferences = req.user.preferences;
    // }
    // Fetch news articles from an external API like NewsAPI
    const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=in&category=${preferences.join(
      ","
    )}`;
    const response = await axios.get(apiUrl);

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = fetchNews;
