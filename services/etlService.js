const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');

// ETL Service to transform raw data into meaningful metrics
exports.extractAndTransformData = async () => {
    try {
        // Extract data from MongoDB
        const leads = await Lead.find();
        const campaigns = await Campaign.find().populate('leads');

        // Transform data: Calculate metrics
        const totalLeads = leads.length;
        const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
        const pendingLeads = leads.filter(lead => lead.status === 'pending').length;
        const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(2);

        // Campaign metrics
        const campaignMetrics = campaigns.map(campaign => ({
            campaignName: campaign.name,
            leadCount: campaign.leads.length,
            startDate: campaign.start_date,
            endDate: campaign.end_date,
        }));

        // Return transformed data as meaningful metrics
        return {
            totalLeads,
            convertedLeads,
            pendingLeads,
            conversionRate: `${conversionRate}%`,
            campaigns: campaignMetrics,
        };
    } catch (error) {
        console.error('Error in ETL process:', error);
        throw error;
    }
};
