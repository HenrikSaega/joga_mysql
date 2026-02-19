class ViewController {
    showRegister(req, res) {
        res.render("register", { title: "Register" });
    }

    showLogin(req, res) {
        res.render("login", { title: "Login" });
    }

    showArticleCreate(req, res) {
        res.render("articleCreate", { title: "Add Article" });
    }

}

module.exports = ViewController;
