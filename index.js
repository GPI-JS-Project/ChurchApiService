// index.js
require('@babel/register')({
    presets: ['@babel/preset-env']
});
const express = require('express');
const app = express();
const routeAnniversary = require('./Routes/routeAnniversary');
const routeBirthday = require('./Routes/routeBirthday');
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use('/birthday', routeBirthday);
app.use('/anniversary', routeAnniversary);


// Define a middleware to handle "Not Found" errors and respond with JSON

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The requested URL ${req.url} was not found`
    });
});





const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});