const routerGithubAuth = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/client").User;

const google_admin = require("../utils/google_admin");
const admin = google_admin();

let nameUser = "";

routerGithubAuth.post("/github-signin", (req, res, next) => {
    console.log("AUTH GITHUB");
    const idToken = req.body.idToken.toString();
    console.log("github signin");
    nameUser = req.body.user;
    const expiresIn = 60 * 60 * 1000;

    admin.auth().createSessionCookie(idToken, {expiresIn}).then(sessionCookie => {
        const options = { maxAge: expiresIn };
        // console.log(sessionCookie);
        res.cookie("session", sessionCookie, options);

        res.json({"status": true, "provider": "github.com"});

    });

});

routerGithubAuth.get("/github/profile", (req, res, next) => {
    console.log("SESSION GITHUB");
    const sessionCookie = req.cookies.session || '';
    
    // console.log(sessionCookie);

    admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        console.log(decodedClaims);

        const {uid, email, name, picture} = decodedClaims;
        const {sign_in_provider} = decodedClaims.firebase;

        User.findOne({id: uid}).then(user => {
            if (!user) {
                const user = new User({
                    id: uid,
                    name: nameUser,
                    photo: picture,
                    bio: "",
                    phone: "",
                    email: email,
                });

                user.save().catch(err => console.log(err));

                res.json({"status": true, "user": {"id": uid, name, "photo": picture, "bio": "", "phone": "", email, "provider":  sign_in_provider}});
            }   
            else{
                const {name, photo, bio, phone, email} = user;
                
                res.json({"status": true, "user": {"id": uid, name, photo, bio, phone, email, "provider":  sign_in_provider}});
            }
        });

        // res.json({"status": true });
    }).catch(error => {
        res.json({"status": false});
        console.log(error);
    })

});

routerGithubAuth.get("/github-logout", (req, res, next) => {
    const sessionCookie = req.cookies.session || '';

    res.clearCookie("session");

    if (sessionCookie) {
        admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
            console.log(decodedClaims, "32");
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        }).then(() => {
            res.json({"status": false, "provider": "github.com"})
        })
    }
});

routerGithubAuth.post("/github-edit", (req, res, next) => {
    
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

module.exports = routerGithubAuth;