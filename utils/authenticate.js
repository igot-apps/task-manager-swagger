/** @format */
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.authenticate = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    // console.log(token);
    const decode = jwt.verify(token, process.env.SECRET);
    const userId = decode._id;

    const foundUser = await User.findById(userId);

    if (foundUser) {
      req.user = foundUser;
      next();
    } else {
      throw new Error("login to access this resource");
    }
  } catch (error) {
    res.send({ message: "login to access this resource", error });
  }
};
