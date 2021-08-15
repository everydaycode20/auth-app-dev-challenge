const router = require("express").Router();

require('dotenv').config({path: "../.env"});


router.post("/signup", (req, res, next) => {
    
    res.send({"message": "ok"});
});








module.exports = router;