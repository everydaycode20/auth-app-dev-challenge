const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/authUsers", {useNewUrlParser: true, useUnifiedTopology: true});

/**
 * 
 * user schema:
 *  id, name, photo, bio, phone, email, password
 * 
 */

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    photo: String,
    bio: String,
    phone: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);


exports.User = User;
exports.Connection = connection;
