const { configDotenv } = require("dotenv");
const express = require("express");
const routes = require("../src/routes");
const db = require("./config/database");
const { signin, signup } = require("./controllers/authController");
const env = configDotenv().parsed;

const app = express();
db();
app.use(express.json());

app.post("/register", signup);
app.post("/login", signin);

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  return res.status(200).send("News Aggregator API v1");
});
app.listen(env.PORT, (err) => {
  console.log(`Server running on --> ${env.PORT}`);
});
