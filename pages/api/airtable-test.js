import Airtable from 'airtable';

export default async function handler(req, res) {
  try {
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_SECRET_TOKEN
    }).base(process.env.AIRTABLE_BASE_ID_CHANGE);

    const table = base(process.env.AIRTABLE_TABLE_ID_CHANGE);

    if (req.method === 'GET') {
      try {
        const query = table.select({
          view: 'Grid view'
        });

        const records = await query.all();
        const formattedRecords = records.map(record => ({
          id: record.id,
          ...record.fields
        }));

        res.status(200).json({ 
          success: true, 
          records: formattedRecords,
          baseId: process.env.AIRTABLE_BASE_ID_CHANGE,
          tableId: process.env.AIRTABLE_TABLE_ID_CHANGE
        });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
          success: false, 
          error: error.message
        });
      }
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
}
