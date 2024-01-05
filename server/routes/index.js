let express = require('express');
let router = express.Router();

const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

const loginController = require('../controllers/LoginController')
//Login Setup

router.get('/login', loginController.GetLogin)

router.post('/login', loginController.PostLogin)

router.get('/register', loginController.GetRegister)

router.post('/register', loginController.PostRegister)

router.get('/logout', loginController.GetLogout)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home' , 
    displayName: req.user ? req.user.displayName:''
  });
});


/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('partials/about', { 
    title: 'About Us',
    displayName: req.user ? req.user.displayName:''  
  });
});

module.exports = router;