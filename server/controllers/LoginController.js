// Importing required modules and dependencies
let express = require('express');
let router = express.Router();

const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

// Route handler for rendering the login page
module.exports.GetLogin = (req, res, next) => {
    // Check if the user is not already logged in
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'), // Flash messages for login errors
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        // If the user is already logged in, redirect to the home page
        return res.redirect('/');
    }
}

// Route handler for processing login
module.exports.PostLogin = (req, res, next) => {
    // Authenticate the user using Passport local strategy
    passport.authenticate('local', function (err, user, info) {
        // Handle server error
        if (err) {
            return next(err);
        }
        // Handle authentication error
        if (!user) {
            req.flash('loginMessage', 'Authentication Error'); // Flash message for login error
            return res.redirect('/login');
        }
        // Log in the user using Passport login method
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            // Redirect to the blog page after successful login
            return res.redirect('/');
        });
    })(req, res, next);
}

// Route handler for rendering the registration page
module.exports.GetRegister = (req, res, next) => {
    // Check if the user is not already logged in
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            message: req.flash('registerMessage'), // Flash messages for registration errors
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        // If the user is already logged in, redirect to the home page
        return res.redirect('/');
    }
}

// Route handler for processing registration
module.exports.PostRegister = (req, res, next) => {
    // Create a new User instance with registration data
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password, // Note: Password is not directly provided here
        email: req.body.email,
        displayName: req.body.displayName
    });

    // Register the new user using the User model's register method
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error in inserting new User");

            // Handle registration error (user already exists)
            if (err.name == 'UserExistError') {
                req.flash('registerMessage', 'Registration Error: User already exists');
            }

            // Render the registration page with an error message
            return res.render('auth/register', {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            // Authenticate the user after successful registration
            return passport.authenticate('local')(req, res, () => {
                // Redirect to the blog page after successful registration and login
                res.redirect('/');
            });
        }
    });
}

// Route handler for logging out the user
module.exports.GetLogout = (req, res, next) => {
    // Use Passport's logout method to log out the user
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    // Redirect to the home page after logout
    res.redirect('/');
}