const admin = require('firebase-admin');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const file = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

/**
 * @returns admin SDK provided by Firebase
 */

module.exports = function getAdmin() {
    // console.log(admin.apps);
    
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(file),
            
        }); 
    }
    

    return admin;
}