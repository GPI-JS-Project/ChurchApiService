// routes.js
const express = require('express');
const router = express.Router();
const BirthdayService = require('../Services/birthdayServices');
const BirthdayController = require('../Controller/birthdayController');
const AnniversaryService = require('../Services/anniversaryServices');
const AnniversaryController = require('../Controller/anniversaryController');

const birthdayServiceResult = new BirthdayService();
const birthdayController = new BirthdayController(birthdayServiceResult);

const anniversaryServiceResult = new AnniversaryService();
const anniversaryController = new AnniversaryController(anniversaryServiceResult);

router.get('/birthday', async (req, res) => {
    try {
        await birthdayController.getBirthday(req, res);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.get('/anniversary', async (req, res) => {
    try {
        await anniversaryController.getAnniversary(req, res);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
module.exports = router;