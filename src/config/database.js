const mongoose = require("mongoose");

async function connectToDatabase() {
  const uri = "mongodb://localhost:27017/newsdb";

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
