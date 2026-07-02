const express = require('express');
const authRoutes = require('./app/auth/routes');

const app = express();
app.use(express.json()); //middleware to parse JSON request bodies

app.use('/auth', authRoutes); //mount the authentication routes
// app.use('/orders', orderRoutes); // mount order routes
// complete for the rest of the project features.


app.get('/', (req, res)=> {
    res.json({ message: 'Cookie Shop is successfully running!' });
});

app.listen(3000, () => {
    console.log('This server is running on port 3000! :)');
});