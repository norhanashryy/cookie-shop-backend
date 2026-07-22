module.exports = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request to ${req.originalUrl} took ${duration} ms`);
    });

    next();
}