const Joi = require("joi");

const userSchema = Joi.object({
  fullName: Joi.string()
    .required()
    .min(3)
    .max(50)
    .error(
      new Error(
        "Full Name is required and must be between 3 and 50 characters."
      )
    ),
  role: Joi.string()
    .valid("user", "admin")
    .required()
    .error(new Error('Role must be either "user" or "admin".')),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("Valid email is required.")),
  password: Joi.string().required().error(new Error("Password is required ")),
});

module.exports = userSchema;
// var { Schema, default: mongoose } = require("mongoose");
// /**
//  * User Schema
//  */

// var UserSchema = new Schema({
//   fullName: {
//     type: String,
//     required: [true, "Full Name required"],
//   },
//   email: {
//     type: String,
//     unique: [true, "Email Id already exists in database"],
//     lowercase: true,
//     trim: true,
//     required: [true, "email required"],
//     validate: {
//       validator: function (v) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
//       },
//       message: "{Value} is invalid email",
//     },
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     required: [true, "Please specify a role"],
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("User", UserSchema);
