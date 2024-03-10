// routes.js
const express = require('express');
const router = express.Router();
const BirthdayService = require('../Services/birthdayServices');
const BirthdayController = require('../Controller/birthdayController');
const AnniversaryService = require('../Services/anniversaryServices');
const AnniversaryController = require('../Controller/anniversaryController');
const NotificationService = require('../Services/notificationResultService');
const NotificationController = require('../Controller/notificationController');

const birthdayServiceResult = new BirthdayService();
const birthdayController = new BirthdayController(birthdayServiceResult);

const anniversaryServiceResult = new AnniversaryService();
const anniversaryController = new AnniversaryController(anniversaryServiceResult);

const notificationServiceResult = new NotificationService();
const notificationController = new NotificationController(notificationServiceResult);

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

router.post('/notification', async (req, res) => {
    try {
        // console.log(req);
        await notificationController.postNotification(req, res);
    } catch (error) {
        res.json({
            error: 'Internal server error when create notification',
            message: error
        });
    }
});

router.get('/notification', async (req, res) => {
    try {
        // console.log(req);
        await notificationController.getNotification(req, res);
    } catch (error) {
        res.json({
            error: 'Internal server error when get notification',
            message: error
        });
    }
});

module.exports = router;