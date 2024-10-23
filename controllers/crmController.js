const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
    const { name, email, status } = req.body;
    try {
        const lead = new Lead({ name, email, status });
        await lead.save();
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Error creating lead', error });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};
