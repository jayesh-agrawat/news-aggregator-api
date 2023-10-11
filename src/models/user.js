var { Schema, default: mongoose } = require("mongoose");
/**
 * User Schema
 */

var UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full Name required"],
  },
  email: {
    type: String,
    unique: [true, "Email Id already exists in database"],
    lowercase: true,
    trim: true,
    required: [true, "email required"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{Value} is invalid email",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: [true, "Please specify a role"],
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
