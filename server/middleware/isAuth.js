
/**
 * @param {admin} admin firebase admin object
 * @returns decodedClaims from firebase auth
 */

module.exports.isAuthorized = (admin) => {
    return (req, res, next) => {
        const sessionCookie = req.cookies.session || '';
        
        const headers = JSON.stringify(req.headers);
        const headerCsrf = JSON.parse(headers);
        
        if (headerCsrf["xsrf-token"] !== req.cookies.csrfToken) {
            res.status(401).json({"status": false});
            return;
        }
        else{
            admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
                res.locals.userInfo = decodedClaims;
                next();
            }).catch(error => {
                res.json({"status": false, "message": "not authorized"});
                console.log(error, "err");
            });
        }

        
    }
}