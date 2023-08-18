/** @format */

const express = require("express");
const router = express.Router();

const { authenticate } = require("../utils/authenticate");

const {
  getTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");


/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all tasks of the logged in user.
 *     responses:
 *       200:
 *         description: sample response data.
 *         content:
 *           application/json:
 *             example:
 *                 _id: 64d98c0e98909cb932b2f87e
 *                 description: learn to HARD
 *                 completed: true
 *                 "owner": "64d98b6e98909cb932b2f875"
 */

router.get("/tasks", authenticate, getTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get specific task created by the user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the  specific task .
 *     responses:
 *       200:
 *         description: sample response data.
 *         content:
 *           application/json:
 *             example:
 *                 _id: 64d98c0e98909cb932b2f87e
 *                 description: learn to HARD
 *                 completed: true
 *                 "owner": "64d98b6e98909cb932b2f875"
 */
router.get("/tasks/:id/", getSingleTask);

/**
 * @swagger
 * /api/v1/addTask:
 *   post:
 *     summary: create a task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: sample responds for successful signup.
 *         content:
 *           application/json:
 *             example:
 *                 success: true
 *                 message: new task added
 */
router.post("/addTask/", authenticate, addTask);



/**
 * @swagger
 * /api/v1/updateTask/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Update the user task by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Update user task by ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the task.
 *               completed:
 *                 type: boolean
 *                 description: Indicates whether the task is completed or not.
 *                 default: false
 *     responses:
 *       200:
 *         description: Sample of expected output.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Task updated
 */
router.post("/updateTask/:id", updateTask);

/**
 * @swagger
 * /api/v1/deleteTask/{id}/:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: delete a specific task by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the  specific task .
 *     responses:
 *       200:
 *         description: sample response data.
 *         content:
 *           application/json:
 *             example:
 *                 success: true
 *                 message: task deleted
 */
router.delete("/deleteTask/:id/", deleteTask);

module.exports = router;
