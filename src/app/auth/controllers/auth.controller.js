const authService = require('../services/auth.service');

/**
 *          To-Do: 
 * POST /auth/register
   POST /auth/login
   GET  /auth/me
   POST /auth/refresh
   POST /auth/logout
 * 
 * */

exports.register = async (req, res) => {
    try {
        const {email, password} = req.body;
        await authService.register(email, password);
        return res.status(201).json({message: 'Account successfully created!'});
    } catch (error) {
        return res.status(409).json({message: 'An account already exists with this email.'});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const tokens = await authService.login(email, password);
        return res.status(200).json({message: 'Login successful!', ...tokens});
    } catch (error) {
        return res.status(401).json({message: 'Invalid email or password.'});
    }
}

exports.getUser = async (req, res) => {

} 