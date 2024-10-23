const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    leads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }],
});

module.exports = mongoose.model('Campaign', campaignSchema);
