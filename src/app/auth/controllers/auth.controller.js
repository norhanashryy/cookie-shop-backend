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
        console.log(req.body);
        const {email, username, password} = req.body;
        await authService.register(email, username, password);
        return res.status(201).json({message: 'Account successfully created!'});
    } catch (error) {
        return res.status(409).json({message: 'An account already exists with this email.'});
    }
}

exports.login = async (req, res) => {

}

exports.getUser = async (req, res) => {

} 