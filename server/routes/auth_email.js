const router = require("express").Router();

const passport = require("passport");

const User = require("../models/client").User;

const bcrypt = require("bcrypt");

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const csrfToken = require("../middleware/csrf_cookie").CsrfToken;

const readFileType = require("../utils/readFileType").readFileType;

const cloudinary = require("cloudinary");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single("file");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.post("/signin", csrfToken, passport.authenticate("local", {failureRedirect: "/failed",}), (req, res, next) => {
    res.json({"status": true, "message": "user logged in"});
});

router.get("/failed", (req, res, next) => {
    res.json({"status": false, "message": "failed login"});
});

router.post("/signup", async (req, res, next) => {
    const {email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 8);

    User.findOne({email: email}).then(user => {
        if (!user) {
            const user = new User({
                name: "",
                photo: "",
                bio: "",
                phone: "",
                email: email,
                password: encryptedPassword,
                authType: "email",
            });

            user.save().catch(err => console.log(err));
            res.json({"status": true, "message": "user registered"});
        }
        else{
            res.json({"status": false, "message": "Email is invalid or already taken"});
        }
    });
});

router.get("/profile", (req, res, next) => {
    
    const {_id, name, photo, bio, phone, email, authType} = req.user;
    console.log(req.user);
    res.json({"status": true, "user": {"id": _id, name, photo, bio, phone, email, "provider": authType}});
});

router.post("/edit", (req, res, next) => {
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

router.get("/logout", (req, res, next) => {

    res.clearCookie("session");
    
    res.clearCookie("csrfToken");
    res.json({"status": false, "message": "user logged out"});
    
});

router.post("/mail/upload-file", (req, res, next) => {
    const {_id} = req.user;
    console.log(_id);
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
                
                        User.findOne({_id: _id}).then(user => {
                            
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

module.exports = router;