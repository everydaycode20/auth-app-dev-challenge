const router = require("express").Router();

const isVerified = require("../middleware/isAuth").isAuthorized;

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const User = require("../models/client").User;

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

const google_admin = require("../utils/google_admin");
const admin = google_admin();

router.post("/upload-file", isVerified(admin), (req, res, next) => {
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

module.exports = router;