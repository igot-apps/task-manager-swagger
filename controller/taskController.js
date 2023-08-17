/** @format */

const Task = require("../model/task.js");

exports.getTasks = async (req, res) => {
  try {
    const user = req.user;
    const tasks = await Task.find({ owner: user._id });
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.send({ mg: "failed to get tasks" });
  }
};

exports.getSingleTask = async (req, res) => {
  //Todo : Get all tasks from db
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      res.send({});
    } else {
      res.send(task);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.addTask = async (req, res) => {
  try {
    const user = req.user;
    const task = await Task.create({
      ...req.body,
      owner: user._id,
    });

    await task.save();

    res.send({ success: true, message: "new task added" });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateTask = async (req, res) => {
  //Todo : update task
//   console.log(req.body)
  try {
    const taskId = req.params.id;

    const updateFields = Object.keys(req.body);
    const allowedUpdatesFields = ["description", "completed"];

    const isValidOperation = updateFields.every((updateField) => {
      return allowedUpdatesFields.includes(updateField);
    });

    if (!isValidOperation) {
      return res.send({
        message:
          "failed , Your update has fields which are not allowed for update",
      });
    } else {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { ...req.body },
        { new: true, runValidators: true }
      );
      res.send({ sucess: true, message: "task updated" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    task.remove();

    res.send({ success: true, message: "task deleted" });
  } catch (error) {
    res.send({ message: "failed to delete task", error });
  }
};
