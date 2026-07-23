const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET; 

// createAccessToken(..)
exports.createAccessToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, ACCESS_SECRET, {expiresIn: '15m'});
}

//createRefreshToken(...)
exports.createRefreshToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, REFRESH_SECRET, {expiresIn: '48h'})
}

//verifyAccessToken(...)
exports.verifyAccessToken = (token) => {
    // jwt.verify extracts the payload from the token and verifies
    // the signature using the secret key. If the signature is invalid, it throws an error.
    
    return jwt.verify(token, ACCESS_SECRET);
}

//verifyRefreshToken(...)
exports.verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
}
// throws an exception if somethings wrong