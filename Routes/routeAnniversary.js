// routes.js
const express = require('express');
const router = express.Router();
const AnniversaryService = require('../Services/anniversaryServices');
const AnniversaryController = require('../Controller/anniversaryController');

const anniversaryServiceResult = new AnniversaryService();
const anniversaryController = new AnniversaryController(anniversaryServiceResult);

router.get('/', async (req, res) => {
    try {
        await anniversaryController.getAnniversary(req, res);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
module.exports = router;