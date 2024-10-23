const express = require('express');
const connectdb = require('./config/connectDB')
const bodyParser = require('body-parser');
require('dotenv').config();

const crmRoutes = require('./routes/crmRoutes');
const marketingRoutes = require('./routes/marketingRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(bodyParser.json());

connectdb()

// Define routes
app.use('/api/crm', crmRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/report', reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
