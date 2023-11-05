const mongoose = require("mongoose");
let dbUrlProd = "mongodb://localhost:27017/newsdb";
let dbUrlTest = "mongodb://localhost:27017/newsdbTest";
dotenv = require("dotenv");
dotenv.config();
async function connectToDatabase() {
  if (process.env.ENV === "production") {
    uri = dbUrlProd;
  } else {
    uri = dbUrlTest;
  }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectToDatabase;
