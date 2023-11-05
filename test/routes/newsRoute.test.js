const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../../src/app"); // Link to server file
const { default: mongoose } = require("mongoose");
chai.use(chaiHttp);

let signUpBody = {
  name: "Test User",
  email: "test@example.com",
  password: "test1234",
  role: "user",
};

let signInBody = {
  email: "test@example.com",
  password: "test1234",
};

describe("/News API", () => {
  let token;

  before((done) => {
    chai
      .request(app)
      .post("/register")
      .send(signUpBody)
      .then((res) => {
        expect(res).status(201);
        expect(res.body)
          .to.have.property("message")
          .equal("User created successfully");
        done();
      });

    chai
      .request(app)
      .post("/login")
      .send(signInBody)
      .then((res) => {
        expect(res).status(200);
        expect(res.body).to.have.property("message").equal("Login Succesful");
        expect(res.body).to.have.property("accessToken");
        token = res.body.accessToken;
        done();
      });
  });

  after((done) => {
    mongoose.connection.db.dropCollection("users").then((res) => {});
    done();
  });

  it("should return all news", (done) => {
    chai
      .request(app)
      .get("/api/v1/news")
      .set("Authorization", `${token}`)
      .then((res) => {
        expect(res).status(200);
        expect(res.body).to.be.an("array");
        done();
      });
    done();
  }).timeout(5000);

  it("should not return news without token", (done) => {
    chai
      .request(app)
      .get("/api/v1/news")
      .then((res) => {
        expect(res).status(401);
        expect(res.body).to.have.property("message").equal("No token provided");
        done();
      });
    done();
  });
});
