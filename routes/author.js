const express = require("express");
const router = express.Router();
const AuthorControllerClass = require("../controllers/author");

const authorController = new AuthorControllerClass();

router.get("/:id", (req, res) => authorController.getAuthor(req, res));

module.exports = router;