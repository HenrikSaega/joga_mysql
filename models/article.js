const BaseSQLModel = require('./base');

module.exports = class ArticleModel extends BaseSQLModel {
    constructor() {
        super("article");
    }

    async findAll(){
        const article = await super.findAll()
        return article
    }
}