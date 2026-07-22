const dotenv = require('dotenv').config();
const express = require('express');
const authRoutes = require('./app/auth/routes');
const app = express();
const errorHandler = require('./app/common/errors/error.handler');
const correlationID = require('./app/common/correlation/correlation.id')
const requestTimer = require('./app/common/middleware/request.timer');

app.use(express.json()); //middleware to parse JSON request bodies
app.use(requestTimer); // middleware to record request start time
app.use(correlationID); // middleware to generate correlation ID for each request

app.use('/auth', authRoutes); //mount the authentication routes
// app.use('/orders', orderRoutes); // mount order routes
// complete for the rest of the project features.

app.use(errorHandler); // global error handler middleware
app.listen(3000, () => {
    console.log('This server is running on port 3000! :)');
});