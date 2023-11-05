const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");

const signup = async (req, res) => {
  const userData = new userSchema({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  userData
    .save()
    .then((data) => {
      return res.status(201).send({ message: "User created successfully" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

const signin = (req, res) => {
  let emailPassed = req.body.email;
  let passwordPassed = req.body.password;
  userSchema
    .findOne({
      email: emailPassed,
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      let passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      }
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );

      return res.status(200).send({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        message: "Login Succesful",
        accessToken: token,
      });
    });
};

module.exports = {
  signin,
  signup,
};
