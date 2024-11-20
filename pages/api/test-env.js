export default function handler(req, res) {
  // Get all environment variables related to Airtable
  const envVars = {
    AIRTABLE_SECRET_TOKEN: process.env.AIRTABLE_SECRET_TOKEN ? 'Present' : 'Missing',
    AIRTABLE_BASE_ID_CHANGE: process.env.AIRTABLE_BASE_ID_CHANGE,
    AIRTABLE_TABLE_ID_CHANGE: process.env.AIRTABLE_TABLE_ID_CHANGE,
    NODE_ENV: process.env.NODE_ENV
  };

  // Return the environment variables
  res.status(200).json({
    message: 'Environment variables check',
    variables: envVars
  });
}
