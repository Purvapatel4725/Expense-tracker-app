// Importing necessary modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// Defining the User schema
let User = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: 'Username is required'
    },
    /*
    password: {
        type: String,
        default: "",
        trim: true,
        required: 'Password is required'
    },
    */
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: 'Display Name is required'
    },
    email: {
        type: String,
        default: "",
        trim: true,
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "user" // Specifying the name of the collection in the database
});

// Configuring the model with passport-local-mongoose for authentication
let options = { MissingPasswordError: 'Wrong/Missing Password' };
User.plugin(passportLocalMongoose, options);

// Exporting the User model
module.exports.User = mongoose.model('User', User);