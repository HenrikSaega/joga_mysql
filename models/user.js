const BaseSQLModel = require('./base');

module.exports = class UserModel extends BaseSQLModel {
    constructor() {
        super("users")
    }

    async registerUser(user){
        const registeredUser = await super.registerUser(user);
        return registeredUser; 
    }
}   