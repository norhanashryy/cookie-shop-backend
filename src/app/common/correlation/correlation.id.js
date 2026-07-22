// npm i uuid
const v4 = require('uuid').v4;

// generate unique correlation ID for each request
module.exports = (req, res, next) => {
    req.correlationId = v4(); // generate a unique correlation ID for each request

    res.setHeader('X-Correlation-ID', req.correlationId); // set the correlation ID in the response header

    next(); // call the next middleware function 
    // important for all middleware functions
}