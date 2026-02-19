const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const userModel = new UserModel();

module.exports = class UserController {
    constructor(){
        const users = []
    }

    async registerUser(req, res) {

        if (!req.body.password || req.body.password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }
            
        if (!req.body.username || req.body.username.length < 6) {
            return res.status(400).json({ message: "Username must be at least 6 characters long." });
        }

        const cryptPassword = await bcrypt.hash(req.body.password, 10);

        try{
            const registeredId = await userModel.registerUser({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            })
            const userData = await userModel.findById(registeredId);

            req.session.user = {
                username: userData.username,
                user_id: userData.id
            }
            res.json({
                message: "New user registered successfully",
                user_session: req.session.user
            })
        } catch (error) {
            return res.status(400).json({ message: "Error registering user: " + error.message });
        }
    }

    async loginUser(req, res){
        try {
            const user = await userModel.findOne("email", req.body.email);
            if (!user) {
                return res.status(400).json({ message: "There are no users with this email!" });
            }
            console.log("User found:", user);
            if(user){

                const match = await bcrypt.compare(req.body.password, user.password);
                if(match){
                    req.session.user = {
                        username: user.username,
                        user_id: user.id
                    }
                        res.json({ message: "Login successful!", user_session: req.session.user});
                } else {
                    res.json({ message: "Incorrect password!"});
                }
            }
        }
        catch (error) {
            return res.status(400).json({ message: "Error logging in user: " + error.message });
        }
    }
}