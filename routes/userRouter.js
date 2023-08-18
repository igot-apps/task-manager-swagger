/** @format */

const express = require("express");
const router = express.Router();

const { authenticate } = require("../utils/authenticate");

const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");



/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns list of all registered users.
 *     responses:
 *       200:
 *         description: sample response data.
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64d9841d34e9a353d0e9cfb8"
 *                 username: "Musa"
 *                 password: "password"
 *                 age: 27
 *                 __v: 0
 *               - _id: "64d98b6e98909cb932b2f875"
 *                 username: "abraham"
 *                 password: "12341234"
 *                 age: 25
 *                 __v: 0
 */

router.get("/users/", getUsers);



/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user .
 *     responses:
 *       200:
 *         description: sample of expected responds data.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: user deleted
 */
router.get("/users/:id/", getSingleUser);

/**
 * @swagger
 * /api/v1/adduser:
 *   post:
 *     summary: Register or add a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *                 default: 1
 *     responses:
 *       200:
 *         description: sample responds for successful signup.
 *         content:
 *           application/json:
 *             example:
 *                 username: Sam
 *                 age: 21
 *                 _id: 64da53ff3639fa3e483775bf
 */
router.post("/adduser/", addUser);


/**
 * @swagger
 * /api/v1/updateUser/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: update user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: update user.
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  password:
 *                    type: string
 *                  age:
 *                    type: number
 *                    default: 1    
 *     responses:
 *       200:
 *         description: sample of expected output.
 *         content:
 *           application/json:
 *             example:
 *               user updated
 */

router.post("/updateUser/:id/", updateUser);


/**
 * @swagger
 * /api/v1/deleteUser/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: delete a user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be deleted.
 *     requestBody:
 *          required: false
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *     responses:
 *       200:
 *         description: Successful response with the personalized greeting.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: user deleted
 */

router.delete("/deleteUser/:id/", deleteUser);

module.exports = router;
