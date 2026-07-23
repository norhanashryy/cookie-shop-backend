const express = require('express');
const router = express.Router();

// importing auth controller
const authController = require('./controllers/auth.controller');

// Registration route
router.post('/register', authController.register);

// log in route
router.post('/login', authController.login);

// user info
router.get('/me', authController.getMe);
// /me receives the access token in the Authorization header, verifies it, and returns the user info

// refresh route
router.get('/refresh', authController.refresh);

router.get('/logout', authController.logout);

module.exports = router;