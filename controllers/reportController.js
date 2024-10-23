const { generatePDFReport } = require('../services/reportService');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const { sendEmail } = require('../services/emailService')
const { extractAndTransformData } = require('../services/etlService');

exports.getReport = async (req, res) => {
    try {
        // Fetch leads and campaigns data
        const leads = await Lead.find();
        const campaigns = await Campaign.find().populate('leads');

        // Generate the PDF report using the fetched data
        const pdfBuffer = await generatePDFReport(leads, campaigns);

        // Set appropriate headers for sending the PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

        // Send the PDF buffer as response
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Error generating report', error });
    }
};

exports.sendAlert = async (req, res) => {
    const leadCount = await Lead.countDocuments();
    if (leadCount > 5) {
        // Send alert if lead count exceeds threshold
        await sendEmail('nikhilkhamchandani210039@acropolis.in', 'Lead Alert', `Total leads exceeded: ${leadCount}`);
        res.status(200).json({ message: 'Alert email sent' });
    } else {
        res.status(200).json({ message: 'No alerts' });
    }
};

exports.getMetrics = async (req, res) => {
    try {
        const metrics = await extractAndTransformData();
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: 'Error generating metrics', error });
    }
};
