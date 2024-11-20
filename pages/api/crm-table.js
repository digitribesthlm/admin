import Airtable from 'airtable';

export default async function handler(req, res) {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_SECRET_TOKEN
  }).base(process.env.AIRTABLE_BASE_ID);

  const table = base(process.env.AIRTABLE_TABLE_ID);

  if (req.method === 'GET') {
    try {
      const records = await table.select().all();
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
      res.status(500).json({ success: false, error: error.message });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { fields } = req.body;
      const record = await table.create(fields);

      const records = await table.select().all();
      const tableData = records.map(record => ({
        id: record.id,
        ...record.fields
      }));

      res.status(200).json({ 
        success: true, 
        createdRecord: record,
        tableData: tableData
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { id, fields } = req.body;
      const record = await table.update(id, fields);

      const records = await table.select().all();
      const tableData = records.map(record => ({
        id: record.id,
        ...record.fields
      }));

      res.status(200).json({ 
        success: true, 
        updatedRecord: record,
        tableData: tableData
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      await table.destroy(id);

      const records = await table.select().all();
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
      res.status(500).json({ success: false, error: error.message });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
