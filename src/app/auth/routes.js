const express = require('express');
const router = express.Router();

// importing auth controller
const authController = require('./controllers/auth.controller');

// Registration route
router.post('/register', authController.register);

// log in route
router.post('/login', authController.login);

// user info
router.get('/me', authController.getUser);

module.exports = router;