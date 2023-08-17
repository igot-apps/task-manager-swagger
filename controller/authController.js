/** @format */
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username, password });

    if (!foundUser) {
      res.send({ message: "invalid login credential , try again" });
    } else {
      const token = foundUser.genToken();
      res.cookie("token", token);
      res.send({ success: true, message: "login sucess!!!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  res.cookie("token", " ", { httpOnly: true });
  res.send({ sucess: true, message: "logout success" });
};

// register
exports.addUser = async (req, res) => {
  try {
    const { username } = req.body;

    //check in a user exist with this username
    let foundUser = await User.findOne({ username });

    if (foundUser) {
      res.send({
        message: "a user exist with the choosen username, try again",
      });
    } else {
      const user = await User.create({
        ...req.body,
      });

      const token = user.genToken();
      res.cookie("token", token);
      res.send({ success: true, message: "user created" });
    }
  } catch (error) {
    const errorMessage = error.message;
    res.send({ message: errorMessage });
  }
};
