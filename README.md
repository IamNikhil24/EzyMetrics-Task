This is the backend for EzyMetrics, focusing on data integrations, reporting, and alerts using Node.js, Express, and MongoDB. 
This project simulates CRM and Marketing data to provide meaningful reports and email alerts based on specific conditions.

Here are the API endpoints with descriptions of where they are used:

1. CRM Endpoints
POST /api/crm/leads
Used For: Creating a new lead with details like name, email, and status.

GET /api/crm/leads
Used For: Fetching all leads from the CRM.

2. Marketing Endpoints
POST /api/marketing/campaigns
Used For: Creating a new marketing campaign with leads associated to it.

GET /api/marketing/campaigns
Used For: Fetching all marketing campaigns and their associated leads.

3. Report Endpoints
GET /api/report/report
Used For: Generating and downloading a report in PDF format that includes data about leads and campaigns.

4. Alert Endpoints
GET /api/report/alert
Used For: Checking the total number of leads. Sends an email alert if the lead count exceeds 5 using Nodemailer.

5. Metrics Endpoint
GET /api/report/metrics
Used For: Fetching key metrics based on the transformed data (ETL process) for reporting purposes.
