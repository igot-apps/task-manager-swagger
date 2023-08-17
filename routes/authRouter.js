/** @format */

const express = require("express");
const router = express.Router();

const { login, logout, addUser } = require("../controller/authController");


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: login user.
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
 *     responses:
 *       200:
 *         description: responds for a successful login.
 *         content:
 *           application/json:
 *             example:
 *                 success: true
 *                 message: "login sucess!!!"
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: log out the current user.
 *     responses:
 *       200:
 *         description: log current user out.
 *         content:
 *           application/json:
 *             example:
 *                 success: true
 *                 message: "logout success"
 */

router.get("/logout", logout);



// router.post("/adduser/", addUser);

module.exports = router;
