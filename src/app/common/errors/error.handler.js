const Logger = require('../logger/logger');

// express error middleware
module.exports = (err, req, res, next) => {
    const operationalError = err.isOperational || false;

    Logger.error(err.message, 
        {  
            statusCode: err.statusCode,
            stack: err.stack,
            operationalError: operationalError,
            body: req.body,
            correlationId: req.correlationId
    });

    if (operationalError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).json({
        message: 'Internal Server Error'
    });
}