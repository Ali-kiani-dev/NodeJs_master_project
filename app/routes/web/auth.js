const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controller
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const forgetPasswordController = require('app/http/controllers/auth/forgetPasswordController');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');

// validator
const loginValidator = require('app/http/validators/loginValidator');
const registerValidator = require('app/http/validators/registerValidator');
const forgetpasswordValidator = require('app/http/validators/forgetpasswordValidator');
const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');


//Login routes
router.get('/login', loginController.showForm);
router.post('/login', loginValidator.handle(), loginController.loginProccess);

//Register routes
router.get('/register', registerController.showForm);
router.post('/register', registerValidator.handle(), registerController.registerProccess);

// Google auth

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/auth/login' }))

// password reset

router.get('/password/reset' , forgetPasswordController.showForm);
router.post('/password/email' ,forgetpasswordValidator.handle(), forgetPasswordController.resetLinkProcess);
router.get('/password/reset/:token' , resetPasswordController.showForm);
router.post('/password/reset' , resetPasswordValidator.handle(), resetPasswordController.resetPasswordProcess);


module.exports = router;