const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

const routes = require("./routes/routes");
const routerGoogleAuth = require("./routes/auth_google");
const routerGithubAuth = require("./routes/auth_github");
const routerUploadFile = require("./routes/upload_file");

app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({extended: true, limit: "2mb"}));
app.use(cookieParser());

app.use("/auth", routes, routerGoogleAuth, routerGithubAuth, routerUploadFile);


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`localhost:${port}`);
});