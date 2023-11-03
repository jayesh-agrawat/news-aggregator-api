const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Role is required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: `{VALUE} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    maxlength: 100,
    trim: true,
  },
  country: {
    type: String,
    default: "IN",
    trim: true,
  },
  preferences: {
    type: String,
    enum: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ],
    default: "general",
    validate: {
      validator: function (v) {
        return v !== undefined && v !== null;
      },
      message:
        "Valid preferences are required [business,entertainment,general,health,science,sports,technology]",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
