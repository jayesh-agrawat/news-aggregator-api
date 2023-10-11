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
