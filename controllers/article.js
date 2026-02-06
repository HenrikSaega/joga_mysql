const ArticleModel = require("../models/article");
const articleModel = new ArticleModel();

module.exports = class rticleController {
    constructor(){
        const articles = [];
    }

    async getAllArticles(req, res){
        const articles = await articleModel.findAll();
        res.status(201).json({article: articles});
        console.log({article: articles});
    }
}