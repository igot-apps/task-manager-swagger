/** @format */

const User = require("../model/user.js");
const awaitHandler = require("../utils/awaitHandler");


exports.addUser = async (req, res) => {
  try {
    const { username, password, age } = req.body;
    console.log(req.body)

    // Create a new user object based on the User model
    const user = new User({
      username,
      password,
      age,
    });

    // Save the user to the database
    const savedUser = await user.save();
    
    res.send(savedUser);
  } catch (e) {
    console.log(e);
    res.send({ msg: "Failed to add user" });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.log(e);
    res.send({ mg: "failed to get users" });
  }
};

exports.getSingleUser = async (req, res) => {
  //Todo : Get all tasks from db
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      res.send({});
    } else {
      res.send(user);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.updateUser = async (req, res) => {
  //Todo : update task
  try {
    console.log("update")
    console.log(req.params)
    const userId = req.params.id;
    // const options = req.body;

    const updateFields = Object.keys(req.body);
    const allowedUpdatesFields = ["password", "age"];

    const isValidOperation = updateFields.every((updateField) => {
      return allowedUpdatesFields.includes(updateField);
    });

    if (!isValidOperation) {
      return res.send({
        message:
          "failed , Your update has fields which are not allowed for update",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.send("user updated");
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    user.remove();

    res.send({ sucess: true, message: "user deleted" });
  } catch (error) {
    res.send({ message: "failed to delete user", error });
  }
};
