/** @format */

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [7, "must be greater than 6"],
    trim: true,
  },
  age: { type: Number, min: [1, "can't be less than 1"] },
});

userSchema.virtual("tasks", {
  ref: "Task",
  foreignField: "owner",
  localField: "_id",
});

userSchema.methods.genToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, {
    expiresIn: "20m",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
