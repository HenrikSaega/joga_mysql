const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const userController = new UserController();

router.post("/users/register", (req, res) => userController.registerUser(req, res));
router.post("/users/login", (req, res) => userController.loginUser(req, res));

module.exports = router;