const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// Define the Person schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    }

});


// Create Person model
const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;