const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userSchema");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          req.message = "Header Verfication Failed";
          next();
        } else {
          UserSchema.findOne({
            id: decode.id,
          })
            .then((user) => {
              req.user = decode.id;
              req.message = "User Found Successfully";
              next();
            })
            .catch((err) => {
              req.user = undefined;
              req.message = "Some Error while finding the user";
              next();
            });
        }
      }
    );
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};

module.exports = verifyToken;
