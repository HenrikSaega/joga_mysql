const ArticleModel = require("../models/article");
const articleModel = new ArticleModel();

module.exports = class rticleController {
    constructor(){
        const article = [];
    }

    async getAllArticles(req, res){
        const article = await articleModel.findAll();
        res.status(201).json({article: article});
    }
}