const BaseSQLModel = require('./base');

module.exports = class AuthorModel extends BaseSQLModel {
    constructor() {
        super("author")
    }

    async getAuthor(id){
        const author = await super.getAuthor("id", id);
        return author; 
    }
}