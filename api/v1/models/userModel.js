const mongoose = require("mongoose");
const generate = require("../../../helpers/generate");
const usersSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", usersSchema, "users");

module.exports = User;
