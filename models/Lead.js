const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: ['pending', 'converted'], required: true },
});

module.exports = mongoose.model('Lead', leadSchema);
