var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

var signup = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });
  //   await user.save();
  user
    .save()
    .then((data) => {
      return res.status(200).send({
        message: "User Saved Succesfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

var signin = (req, res) => {
  let emailPassed = req.body.email;
  let passwordPassed = req.body.password;

  User.findOne({
    email: emailPassed,
  }).then((user) => {
    if (!user) return res.status(404).send({ message: "User not found" });
    var passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }

    var token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
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
