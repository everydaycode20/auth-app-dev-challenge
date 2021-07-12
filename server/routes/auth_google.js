const routerGoogleAuth = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/client").User;

const readFileType = require("../utils/readFileType").readFileType;

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single("file");

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const google_admin = require("../utils/google_admin");
const admin = google_admin();

const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

routerGoogleAuth.post("/google-signin", (req, res, next) => {
    console.log("AUTH GOOGLE");
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 1000;

    admin.auth().createSessionCookie(idToken, {expiresIn}).then(sessionCookie => {
        const options = { maxAge: expiresIn };
        // console.log(sessionCookie);
        res.cookie("session", sessionCookie, options);
        
        res.json({"status": true, "provider": "google.com"});

    });
});

routerGoogleAuth.get("/google-logout", (req, res, next) => {
    const sessionCookie = req.cookies.session || '';

    res.clearCookie("session");
    res.clearCookie("id");
    if (sessionCookie) {
        admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
            console.log(decodedClaims, "32");
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        }).then(() => {
            
            res.json({"status": false, "provider": "github.com"})
        })
    }
});

routerGoogleAuth.get("/google/profile", (req, res, next) => {

    const sessionCookie = req.cookies.session || '';

    admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {

        const {uid, email, name, picture} = decodedClaims;
        const {sign_in_provider} = decodedClaims.firebase;
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

                res.json({"status": true, "user": {"id": uid, name, "photo": picture, "bio": "", "phone": "", email, "provider":  sign_in_provider}});
                
            }
            else{
                const {name, photo, bio, phone, email} = user;
                
                res.json({"status": true, "user": {"id": uid, name, photo, bio, phone, email, "provider":  sign_in_provider}});
            }
        });

    }).catch(error => {
        res.json({"status": false});
        console.log(error);
    });

});

routerGoogleAuth.post("/google-edit", (req, res, next) => {
    
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

routerGoogleAuth.post("/upload-file", (req, res, next) => {
    const {id} = req.cookies;
    
    upload(req, res, err => {
        let buffer = req.file.buffer;
        
        if (err instanceof multer.MulterError) {
            res.status(400).json({status: false, message: "server error"});
        }
        else{
            readFileType(buffer).then(img => {
                if (!img.mime.match(/.(jpg|jpeg|png)$/i)) {
                    res.json({"status": false, "message": "wrong file type"});
                }
                else{
                    const image = buffer.toString("base64");
                    const image64 = `data:image/png;base64,${image}`;

                    cloudinary.v2.uploader.upload(image64, function(error, result){
                        if(error) throw error;
                
                        User.findOne({id: id}).then(user => {
                            if (user) {
                                user.photo = result.secure_url;
                                
                                user.save().then(() => {
                                    res.json({"image": result.secure_url});
                                }).catch(err => console.log(err));
                            }
                        });
                    });
                }


            });
        }
    });
});

module.exports = routerGoogleAuth;