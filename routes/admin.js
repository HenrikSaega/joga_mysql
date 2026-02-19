const express = require("express");
const router = express.Router();
const ArticleAdminController = require("../controllers/admin/article");
const checkUsers = require("../utils/checkUsers");

const articleAdminController = new ArticleAdminController();


router.post("/admin/article/create",  checkUsers("adminUser"), (req ,res) => articleAdminController.createNewArticle(req, res));
router.put("/admin/article/edit/:id", checkUsers("adminUser"), (req ,res) => articleAdminController.updateArticle(req, res));
router.delete("/admin/article/delete/:id", checkUsers("adminUser"), (req ,res) => articleAdminController.deleteArticle(req, res));

module.exports = router;