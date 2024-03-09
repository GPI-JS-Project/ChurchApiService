const schedule = require('node-schedule');
const job = schedule.scheduleJob('26 * * * *', function () {
    console.log("------Schedule start-----");
});