/** @format */

const mongoose = require("mongoose");
// const URI = `mongodb://127.0.0.1:27017/task-manager`;
 const URI = `mongodb+srv://igot-apps:${process.env.DB_PASSWORD}@task-manager-dbs.hb4fis3.mongodb.net`

// const Task = require("../model/task");

const connectDatabase = () => {
  mongoose
    .connect(URI)
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch((e) => {
      console.log("failed to connect to db");
    });
};

module.exports = connectDatabase;
