const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

const session = require("express-session");
const MongoStore = require('connect-mongo');

const passport = require("passport");

const routerGoogleAuth = require("./routes/auth_google");
const routerGithubAuth = require("./routes/auth_github");
const routerUploadFile = require("./routes/upload_file");
const routerEmail = require("./routes/auth_email");

app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({extended: true, limit: "2mb"}));
app.use(cookieParser());

app.use(session({
    // proxy: true,
    secret: "secret",
    name: "session",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/authUsers"}),    
    cookie: {
        maxAge: 1000 * 60 * 60 * 4,
        // sameSite: "lax",
        // secure: true,
        // httpOnly: true,
    }
}));

require("./utils/passport_config/passport-strategy");
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", routerGoogleAuth, routerGithubAuth, routerUploadFile, routerEmail);


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`localhost:${port}`);
});