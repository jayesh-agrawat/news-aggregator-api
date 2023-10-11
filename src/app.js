const { configDotenv } = require("dotenv");
const express = require("express");
const { default: mongoose } = require("mongoose");
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
// app.use(express.json()) || const bodyParser = require('body-parser'); app.use(bodyParser.json());
const { signin, signup } = require("./controllers/authController");
const env = configDotenv().parsed;

const app = express();

app.use(express.json());

try {
  mongoose.connect(`${env.DB_URI}/${env.DB_USERS}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

app.post("/register", signup);

app.post("/login", signin);

app.get("/", (req, res) => {
  return res.status(200).send("Alive News Aggregator API v1");
});
app.listen(env.PORT, (err) => {
  console.log(`Server running on --> ${env.PORT}`);
});
