const { v4: uuidv4 } = require('uuid');

module.exports.CsrfToken = (req, res, next) => {
    const options = { maxAge: 60 * 60 * 1000 };
    res.cookie("csrfToken", (uuidv4()), options);
    next();
}

