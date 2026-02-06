const BaseSQLModel = require('./base');

module.exports = class ArticleModel extends BaseSQLModel {
    constructor() {
        super("article");
    }

    async findAll(){
        const articles = await super.findAll()
        return articles
    }
}