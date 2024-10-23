const express = require('express');
const { createCampaign, getCampaigns } = require('../controllers/marketingController');

const router = express.Router();

router.post('/campaigns', createCampaign);
router.get('/campaigns', getCampaigns);

module.exports = router;
