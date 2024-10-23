const express = require('express');
const { createLead, getLeads } = require('../controllers/crmController');

const router = express.Router();

router.post('/leads', createLead);
router.get('/leads', getLeads);

module.exports = router;
