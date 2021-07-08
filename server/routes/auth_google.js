const routerGoogleAuth = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/client").User;

const google_admin = require("../utils/google_admin");
const admin = google_admin();

routerGoogleAuth.post("/google-signin", (req, res, next) => {

    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 1000;

    admin.auth().createSessionCookie(idToken, {expiresIn}).then(sessionCookie => {
        const options = { maxAge: expiresIn };
        // console.log(sessionCookie);
        res.cookie("session", sessionCookie, options);

        res.json({"status": true, "provider": "google.com"});

    });
});

routerGoogleAuth.get("/logout", (req, res, next) => {
    const sessionCookie = req.cookies.session || '';

    res.clearCookie("session");

    if (sessionCookie) {
        admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        }).then(() => {
            
            res.json({"status": false, "provider": "github.com"})
        })
    }
});

routerGoogleAuth.get("/google/profile", (req, res, next) => {
    // console.log(req.cookies);
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
                    name: name,
                    photo: picture,
                    bio: "",
                    phone: "",
                    email: email,
                });

                user.save().catch(err => console.log(err));
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

routerGoogleAuth.post("/google-edit", (req, res, next) => {
    // console.log(req.body);
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
    })
});

module.exports = routerGoogleAuth;