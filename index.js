const express = require("express");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const { engine } = require("express-handlebars");


const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}))

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Controllers
const articleControllerClass = require("./controllers/article");
const authorControllerClass = require("./controllers/author");

const articleController = new articleControllerClass();
const authorController = new authorControllerClass();

// Routes
const articleRoutes = require("./routes/articles");
const authorRoutes = require("./routes/authors");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const viewRoutes = require("./routes/viewRoutes");

app.use("/", viewRoutes);
app.use("/", articleRoutes);
app.use("/author", authorRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(3025, () => {
    console.log("App is started at http://localhost:3025");
});