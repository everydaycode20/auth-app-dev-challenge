
/**
 * @param {admin} admin firebase admin object
 * @returns decodedClaims from firebase auth
 */

module.exports.isAuthorized = (admin) => {
    return (req, res, next) => {
        const sessionCookie = req.cookies.session || '';

        admin.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
            res.locals.userInfo = decodedClaims;
            next();
        }).catch(error => {
            res.json({"status": false, "message": "not authorized"});
            console.log(error, "err");
        });
    }
}