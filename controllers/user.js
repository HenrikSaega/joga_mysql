const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const userModel = new UserModel();

module.exports = class UserController {
    constructor(){
        const users = []
    }

    async register(req, res) {
        const cryptPassword = await bcrypt.hash(req.body.password, 10);

            const registeredId = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            })
            try{
                if(registeredId) {
                    const userData = await userModel.findById(registeredId);
                    req.session.user = {
                        username: userData.username,
                        user_id: userData.id
                    }
                    res.json({
                        message: "New user registered successfully",
                        user_session: req.session.user
                    })
                } else {
                    res.status(500).json({message: "USer registration failed"});
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server error", error });
            }
    }
}