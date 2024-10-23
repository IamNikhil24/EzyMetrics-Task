const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const connectdb = require('../config/connectDB');
require('dotenv').config();

const generateDummyData = async () => {
    // Connect to the database
    await connectdb();

    const leads = [
        { name: 'John Doe', email: 'john@example.com', status: 'converted' },
        { name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
        { name: 'Alice Johnson', email: 'alice@example.com', status: 'converted' },
        { name: 'Bob Brown', email: 'bob@example.com', status: 'pending' },
        { name: 'Charlie Black', email: 'charlie@example.com', status: 'converted' },
    ];

    const campaigns = [
        { name: 'Spring Sale', start_date: new Date('2024-03-01'), end_date: new Date('2024-03-31'), leads: [] },
        { name: 'Summer Promo', start_date: new Date('2024-06-01'), end_date: new Date('2024-06-30'), leads: [] },
    ];

    try {
        // Insert leads into the database
        await Lead.insertMany(leads);
        const savedLeads = await Lead.find();

        // Associate leads with campaigns
        campaigns[0].leads.push(savedLeads[0]._id);
        campaigns[0].leads.push(savedLeads[2]._id);
        campaigns[1].leads.push(savedLeads[1]._id);
        campaigns[1].leads.push(savedLeads[3]._id);

        // Insert campaigns into the database
        await Campaign.insertMany(campaigns);

        console.log('Dummy data generated successfully');
    } catch (error) {
        console.error('Error generating dummy data:', error.message);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

generateDummyData();
