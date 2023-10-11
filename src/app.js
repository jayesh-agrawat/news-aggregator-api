const { configDotenv } = require("dotenv");
const express = require("express");
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
// app.use(express.json()) || const bodyParser = require('body-parser'); app.use(bodyParser.json());

const env = configDotenv().parsed;

const app = express();

app.use(express.json());

app.listen(env.PORT, (err) => {
  console.log(`Server running on --> ${env.PORT}`);
});
