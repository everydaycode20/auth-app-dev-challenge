module.exports.isAuthEmail = (req, res, next) => {
    const headers = JSON.stringify(req.headers);
    const headerCsrf = JSON.parse(headers);

    if (req.isAuthenticated()) {
        next();
    }
    else{
        res.json({"status": false,"message": "user not logged in"});
    }
}