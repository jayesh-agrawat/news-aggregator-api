const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");
const cache = require("../data/cache");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          req.message = "Header Verfication Failed";
          next();
        } else {
          if (cache.has(decode.id)) {
            req.user = cache.get(decode.id);
            req.message = "User Found Successfully";
            next();
          } else {
            req.user = undefined;
            req.message = "Some Error while finding the user";
            next();
          }
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
