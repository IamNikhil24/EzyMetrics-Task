const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
    const { name, start_date, end_date, leads } = req.body;
    try {
        const campaign = new Campaign({ name, start_date, end_date, leads });
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: 'Error creating campaign', error });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('leads');
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching campaigns', error });
    }
};
