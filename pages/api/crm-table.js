import Airtable from 'airtable';

export default async function handler(req, res) {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_SECRET_TOKEN
  }).base(process.env.AIRTABLE_BASE_ID);

  const table = base(process.env.AIRTABLE_TABLE_ID);

  if (req.method === 'GET') {
    try {
      // Check if we're requesting a specific record
      if (req.query.recordId) {
        try {
          const record = await table.find(req.query.recordId);
          res.status(200).json({ 
            success: true, 
            record: {
              id: record.id,
              ...record.fields
            }
          });
        } catch (error) {
          console.error('Error fetching specific record:', error);
          res.status(404).json({ 
            success: false, 
            error: 'Record not found' 
          });
        }
        return;
      }

      // Default list fetching logic
      let query = table.select();
      
      // If a type is specified, filter the records
      if (req.query.type) {
        query = table.select({
          filterByFormula: `{type} = "${req.query.type}"`
        });
      }

      const records = await query.all();
      const tableData = records.map(record => ({
        id: record.id,
        ...record.fields
      }));

      res.status(200).json({ 
        success: true, 
        tableData: tableData
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: {
          baseId: process.env.AIRTABLE_BASE_ID,
          tableId: process.env.AIRTABLE_TABLE_ID
        }
      });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const base = new Airtable({
        apiKey: process.env.AIRTABLE_SECRET_TOKEN
      }).base(process.env.AIRTABLE_BASE_ID_SALES);

      const table = base(process.env.AIRTABLE_TABLE_ID_SALES);
      
      const record = await table.create([
        {
          fields: req.body.fields
        }
      ]);

      res.status(200).json({ 
        success: true, 
        record: {
          id: record[0].id,
          ...record[0].fields
        }
      });
    } catch (error) {
      console.error('Error creating record:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Failed to create record'
      });
    }
  }
  else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
