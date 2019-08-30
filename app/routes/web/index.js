const express = require('express');
const router = express.Router();
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const adminRoutes = require('./admin');

// middleware 
const redirectAuthenticated = require('app/http/middleware/redirectAuthenticated');
const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');
const checkError = require('app/http/middleware/checkError');


const redirectAdmin = require('app/http/middleware/redirectAdmin')
// Home Routes
router.use('/', homeRoutes);

// Auth Routes
router.use('/auth', redirectAuthenticated.handle, authRoutes);

//admin Panel2
router.use('/admin', redirectIfNotAuthenticated.handle, adminRoutes);

// Error Routes
router.all('*', checkError.get404);
router.use(checkError.handle);

module.exports = router;