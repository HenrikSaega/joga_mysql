const express = require("express");
const router = express.Router();
const ViewController = require("../controllers/viewController");
const viewController = new ViewController();

router.get("/users/register", (req, res) => viewController.showRegister(req, res));
router.get("/users/login", (req, res) => viewController.showLogin(req, res));
router.get("/admin/article/create", (req, res) => viewController.showArticleCreate(req, res));

module.exports = router;
