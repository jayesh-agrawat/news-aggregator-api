const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../../src/app"); // Link to server file
chai.use(chaiHttp);
const { default: mongoose } = require("mongoose");

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

let preferenceBody = {
  preference: "business",
};

describe("/preference API", () => {
  let token;

  before((done) => {
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
    done();
  });

  after((done) => {
    mongoose.connection.db.dropCollection("users").then((res) => {});
    done();
  });

  it("should set preferences", (done) => {
    chai
      .request(app)
      .put("/api/v1/preference")
      .send(preferenceBody)
      .set("Authorization", `${token}`)
      .then((res) => {
        expect(res).status(200);
        expect(res.body)
          .to.have.property("message")
          .equal("Preferences set successfully");
        done();
      });
    done();
  }).timeout(5000);

  it("should set valid preferences", (done) => {
    chai
      .request(app)
      .put("/api/v1/preference")
      .send({})
      .then((res) => {
        expect(res).status(400);
        expect(res.body)
          .to.have.property("message")
          .equal("Preferences should be an array");
        done();
      });
    done();
  });

  it("should get preferences", (done) => {
    chai
      .request(app)
      .get("/api/v1/preference")
      .set("Authorization", `${token}`)
      .then((res) => {
        res.body.should.be.a("array");
        done();
      });
    done();
  }).timeout(5000);

  it("should not get preferences without token", (done) => {
    chai
      .request(app)
      .get("/api/v1/preference")
      .then((res) => {
        expect(res).status(401);
        expect(res.body).to.have.property("message").equal("No token provided");
        done();
      });
    done();
  });
});
