const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

const routes = require("./routes/routes");
const routerGoogleAuth = require("./routes/auth_google");
const routerGithubAuth = require("./routes/auth_github");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use("/auth", routes, routerGoogleAuth, routerGithubAuth);


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`localhost:${port}`);
});