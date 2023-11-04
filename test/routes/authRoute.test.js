const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../../src/app"); // Link to server file
chai.use(chaiHttp);
// describe("[/register]Creating a user in mongodb - without mocking", () => {
//   it("should create a new user", (done) => {
//     let user = new User({
//       name: "Test User",
//       email: "test@example.com",
//       password: "test1234",
//       role: "user",
//     });

//     user
//       .save()
//       .then((user) => {
//         expect(user.isNew).equals(false);
//         done();
//       })
//       .catch((err) => {});
//     done();
//   });

//   it("should not create a user with the same email", async () => {
//     const user1 = new User({
//       name: "Test User 1",
//       role: "user",
//       email: "test@example.com",
//       password: "password123",
//       country: "IN",
//       preferences: "general",
//     });
//     const user2 = new User({
//       name: "Test User 2",
//       role: "user",
//       email: "test@example.com",
//       password: "password1234",
//       country: "IN",
//       preferences: "general",
//     });
//     user1.save().then((user) => {
//       user2.save().catch((err) => {
//         expect(error).to.exist;
//         expect(error.code).to.equal(11000);
//       });
//     });
//   });

//   it("should not create a new user if email is invalid", (done) => {
//     let user = new User({
//       name: "Test User",
//       email: "testmail.com",
//       password: "test1234",
//       role: "user",
//     });

//     user.save().catch((err) => {
//       expect(err._message).equal("User validation failed");
//       done();
//     });
//   });

//   it("should not create a new user if email is not provided", (done) => {
//     let user = new User({
//       name: "Test User",
//       password: "test1234",
//       role: "user",
//     });

//     user.save().catch((err) => {
//       expect(err._message).equal("User validation failed");
//       done();
//     });
//   });

//   it("should not create a new user if password is not provided", (done) => {
//     let user = new User({
//       name: "Test User",
//       email: "test@example.com",
//       role: "user",
//     });

//     user.save().catch((err) => {
//       expect(err._message).equal("User validation failed");
//       done();
//     });
//   });

//   it("should not create a new user if role is not provided", (done) => {
//     let user = new User({
//       name: "Test User",
//       email: "test@example.com",
//       password: "test1234",
//     });
//     user.save().catch((err) => {
//       expect(err._message).equal("User validation failed");
//       done();
//     });
//   });
// });

// describe("[/register] create a user in mongodb", () => {
//   let saveStub;
//   let signUpBody = new User({
//     name: "Test User",
//     email: "test@example.com",
//     password: bcrypt.hashSync("test1234", 0),
//     role: "user",
//   });
//   let signInBody = new User({
//     email: "test@example.com",
//     password: bcrypt.hashSync("test1234", 0),
//   });

//   let token;
//   beforeEach((done) => {
//     saveStub = sinon.stub(User.prototype, "save"); // prototype in js
//   });
//   afterEach(() => {
//     saveStub.restore();
//   });

//   it("should create a new user", (done) => {
//     chai
//       .request(app)
//       .post("/register")
//       .send(signupBody)
//       .end((err, res) => {
//         done();
//       });

//     //     user
//     //       .save()
//     //       .then((user) => {
//     //         expect(user.isNew).equals(false);
//     //         done();
//     //       })
//     //       .catch((err) => {});
//     //     done();
//     //   });
//     done();
//   });
// }).timeout(5000);

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
describe("Auth Controller", () => {
  describe("POST /register", () => {
    it("should sign up a user", (done) => {
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
    }).timeout(5000);

    it("should not create a user with existing email id", (done) => {
      // try to create a user with the same email id
      chai
        .request(app)
        .post("/register")
        .send(signUpBody)
        .then((res) => {
          expect(res).status(500);
          expect(res.body)
            .to.have.property("message")
            .to.have.property("code")
            .equal(11000);
          done();
        });
    });
  });

  describe("POST /login", () => {
    it("should login a user", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(signInBody)
        .then((res) => {
          expect(res).status(200);
          expect(res.body).to.have.property("accessToken");
          expect(res.body).to.have.property("message").equal("Login Succesful");
          done();
        });
    });

    it("should not login a user with invalid credentials", (done) => {
      signInBody.password = "test@1234";
      chai
        .request(app)
        .post("/login")
        .send(signInBody)
        .then((res) => {
          expect(res).status(401);
          expect(res.body)
            .to.have.property("message")
            .equal("Invalid Password");
          done();
        });
    });

    it("should not login a non-existing user", (done) => {
      signInBody.email = "nonexisiting@example.com";
      chai
        .request(app)
        .post("/login")
        .send(signInBody)
        .then((res) => {
          expect(res).status(404);
          expect(res.body).to.have.property("message").equal("User not found");
          done();
        });
    });
  });
});
