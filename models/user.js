const BaseSQLModel = require('./base');

module.exports = class UserModel extends BaseSQLModel {
    constructor() {
        super("users")
    }

    async registerUser(data){
        const existingEmail = await this.findOne("email", data.email);
        const existingUsername = await this.findOne("username", data.username);

        if (existingEmail) {
            throw new Error(`Email ${data.email} is already taken!`);
        }
        if (existingUsername) {
            throw new Error(`Username ${data.username} is already taken!`);
        }

        const registeredUser = await this.create(data);
        return registeredUser; 
    }

    async loginUser(data){
        const user = await this.findOne("email", data.email);
        const passwordMatch = user && await bcrypt.compare(data.password, user.password);

        if(passwordMatch){
            return user;
        }
        throw new Error("Incorrect email and password combination!");
    }
}   