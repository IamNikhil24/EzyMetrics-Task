const PDFDocument = require('pdfkit');

exports.generatePDFReport = async (leads, campaigns) => {
    const doc = new PDFDocument();
    const buffers = [];

    // Capture PDF data as buffers
    doc.on('data', buffers.push.bind(buffers));

    // Handle the end event to return the complete PDF
    return new Promise((resolve, reject) => {
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        // Write leads to PDF
        doc.text('Leads Report\n\n');
        leads.forEach((lead, index) => {
            doc.text(`${index + 1}. Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}`);
        });

        // Write campaigns to PDF
        doc.addPage().text('Campaigns Report\n\n');
        campaigns.forEach((campaign, index) => {
            doc.text(`${index + 1}. Name: ${campaign.name}, Start Date: ${campaign.start_date}, End Date: ${campaign.end_date}`);
        });

        // End PDF creation
        doc.end();
    });
};
