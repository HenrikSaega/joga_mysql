const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const userController = new UserController();

router.post("/users/register", (req, res) => userController.register(req, res));

module.exports = router;