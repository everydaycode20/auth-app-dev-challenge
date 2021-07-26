const bcrypt = require('bcrypt');

module.exports.comparePassword = async (userPassword, dbPassword) => {
    const pass = await bcrypt.compare(userPassword, dbPassword);

    return pass;
}