module.exports.isAuthEmail = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else{
        res.json({"status": false,"message": "user not logged in"});
    }
}