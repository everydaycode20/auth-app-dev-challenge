const admin = require('firebase-admin');

const file = require("../auth-app-f4181-firebase-adminsdk-ay8k7-9e957fa79e.json");

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