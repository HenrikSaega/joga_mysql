const ArticleModel = require("../models/article");
const articleModel = new ArticleModel();

const AuthorModel = require("../models/author");
const authorModel = new AuthorModel();

module.exports = class AuthorController {
    constructor(){
        const authors = []
    }

    async getAuthor(req, res) {
        const author = await authorModel.getAuthor(req.params.id);
        const authorId = author[0];
        const articles = await articleModel.getAuthor("author_id", authorId.id);
        author["article"] = articles;
        res.status(201).json({author: author, articles: articles});
    }
}