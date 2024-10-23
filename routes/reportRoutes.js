const express = require('express');
const { getReport, sendAlert, getMetrics } = require('../controllers/reportController');

const router = express.Router();

router.get('/report', getReport);
router.get('/alert', sendAlert);
router.get('/metrics', getMetrics);

module.exports = router;
