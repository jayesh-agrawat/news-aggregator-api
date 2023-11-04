const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = require("../../src/models/userSchema");
const uri = "mongodb://localhost:27017/newsdbTest";

before((done) => {
  done();
});

beforeEach((done) => {
  console.log("Running before Each test");
  done();
});

afterEach((done) => {
  console.log("Running after Each test");
  done();
});

after(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});
