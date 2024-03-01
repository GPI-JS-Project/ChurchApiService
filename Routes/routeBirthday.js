// routes.js
const express = require('express');
const router = express.Router();
const BirthdayService = require('../Services/birthdayServices');
const BirthdayController = require('../Controller/birthdayController');

const birthdayServiceResult = new BirthdayService();
const birthdayController = new BirthdayController(birthdayServiceResult);


router.get('/search', async (req, res) => {
    try {
        await birthdayController.getBirthday(req, res);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


module.exports = router;