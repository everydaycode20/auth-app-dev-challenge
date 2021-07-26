const routerGoogleAuth = require("express").Router();
const mongoose = require("mongoose");

const csrfToken = require("../middleware/csrf_cookie").CsrfToken;

const isVerified = require("../middleware/isAuth").isAuthorized;

const User = require("../models/client").User;

const google_admin = require("../utils/google_admin");
const admin = google_admin();

routerGoogleAuth.post("/google/signin", csrfToken, (req, res, next) => {
    
    const idToken = req.body.idToken.toString();
    
    const expiresIn = 60 * 60 * 1000;
    
    admin.auth().createSessionCookie(idToken, {expiresIn}).then(sessionCookie => {
        const options = { maxAge: expiresIn };
        
        res.cookie("session", sessionCookie, options);
        
        res.json({"status": true, "provider": "google.com" });

    });
});

routerGoogleAuth.get("/google/logout", (req, res, next) => {
    const sessionCookie = req.cookies.session || '';
    
    res.clearCookie("session");
    res.clearCookie("id");
    res.clearCookie("csrfToken");
    if (sessionCookie) {
        admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
            console.log(decodedClaims, "32");
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        }).then(() => {
            
            res.json({"status": false, "provider": "github.com"})
        })
    }
});

routerGoogleAuth.get("/google/profile", isVerified(admin), (req, res, next) => {

    const {uid, email, name, picture} = res.locals.userInfo;
    const {sign_in_provider} = res.locals.userInfo.firebase;

    res.cookie("id", uid);

    User.findOne({id: uid}).then(user => {
        if (!user) {
            const user = new User({
                id: uid,
                name: name,
                photo: picture,
                bio: "",
                phone: "",
                email: email,
            });

            user.save().catch(err => console.log(err));
            
            res.json({"status": true, "user": {"id": uid, name, "photo": picture, "bio": "", "phone": "", email, "provider":  sign_in_provider, }});
            
        }
        else{
            const {name, photo, bio, phone, email} = user;
            
            res.json({"status": true, "user": {"id": uid, name, photo, bio, phone, email, "provider":  sign_in_provider}});
        }
    });
});

routerGoogleAuth.post("/google/edit", isVerified(admin), (req, res, next) => {
    
    const {id, name, bio, phone, email} = req.body;

    User.findOne({id: id}).then(user => {
        if (user) {
            user.name = name;
            user.bio = bio;
            user.phone = phone;
            user.email = email;

            user.save().then(() => {
                res.json({"status": true});
            }).catch(err => console.log(err));
        }
    });
});

module.exports = routerGoogleAuth;