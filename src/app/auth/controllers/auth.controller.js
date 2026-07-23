const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        await authService.register(email, password, req.correlationId);
        return res.status(201).json({message: 'Account successfully created!'});
    } catch (error) {
        //return res.status(409).json({message: 'An account already exists with this email.'});
        return next(error); // pass the error to the global error handler middleware
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const tokens = await authService.login(email, password, req.correlationId);
        return res.status(200).json({message: 'Login successful!', ...tokens});
    } catch (error) {
        // return res.status(401).json({message: 'Invalid email or password.'});
        return next(error);
    }
}

exports.getMe = async (req, res, next) => {
    try {
        // const {email} = req.body.email;      -> useless for this request

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({message: 'Authorization header missing.'});
        }
        const token = authHeader.split(' ')[1]; // bearer token format

        const user = await authService.getMe(token);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
} 

exports.refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        const accessToken = await authService.refresh(refreshToken);
        return res.status(200).json({accessToken});
    } catch (error) {
        next(error);
    }
}

exports.logout = (req, res, next) => {
    try {
        // to be implemented
    } catch(error) {
        next(error);
    }
}

// throw as early as u can (service abl ma ab3at lel repository), catch as late as u can (el controller) -> Best practice