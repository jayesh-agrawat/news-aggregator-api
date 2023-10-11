const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cache = require("../data/cache");
const userSchema = require("../models/user");

const signup = (req, res) => {
  const userData = {
    fullName: req.body.fullName,
    role: req.body.email,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  userSchema.validate(userData);
  if (cache.has(userData.email)) {
    return res.status(409).send({
      message: "Email Id already exists in database",
    });
  } else {
    userData["preferences"] = [];
    cache.set(userData.email, userData);
    return res.status(200).send({
      message: "User Saved Succesfully",
    });
  }
};

const signin = (req, res) => {
  let emailPassed = req.body.email;
  let passwordPassed = req.body.password;

  if (cache.has(emailPassed)) {
    let user = cache.get(emailPassed);
    let passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }
    const token = jwt.sign(
      {
        id: user.email,
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
        fullName: user.fullName,
      },
      message: "Login Succesful",
      accessToken: token,
    });
  } else {
    return res.status(404).send({ message: "User not found" });
  }
};

module.exports = {
  signin,
  signup,
};
