// index.js
require('@babel/register')({
    presets: ['@babel/preset-env']
});
const express = require('express');
const app = express();
const routes = require('./Routes/routes');
const cors = require("cors");
app.use(cors());
app.use(express.json());

// const schedule = require('node-schedule');
// schedule.scheduleJob('* * * * *', (fireDate) => {
//     console.log("------Schedule start----- at " + fireDate + "but actually in " + new Date());
// });

app.use('/api/v1', routes);


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