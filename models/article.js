const BaseSQLModel = require('./base');

module.exports = class ArticleModel extends BaseSQLModel {
    constructor() {
        super("article");
    }

    async findAll(){
        const articles = await super.findAll()
        return articles;
    }

    async findOne(slug){
        const article = await super.findOne("slug", slug);
        return article; 
    }

    async create(article){
        const createdArticleId = await super.create(article);
        return createdArticleId;
    }

    async update(id, article){
        const updateArticleId = await super.update(id, article);
        return updateArticleId;
    }

    async delete(id){
        const deleteArticleId = await super.delete(id);
        return deleteArticleId;
    }
}