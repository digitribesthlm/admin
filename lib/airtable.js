 import Airtable from 'airtable';

export async function airtablePost(baseId, tableId, data, token) {
  const base = new Airtable({ apiKey: token }).base(baseId);
  const table = base(tableId);
  
  try {
    const records = await table.create([
      {
        fields: data.fields
      }
    ]);
    return { records };
  } catch (error) {
    console.error('Airtable Error:', error);
    throw error;
  }
}

export async function airtableGet(baseId, tableId, token) {
  const base = new Airtable({ apiKey: token }).base(baseId);
  const table = base(tableId);
  
  try {
    const records = await table.select().all();
    return { records };
  } catch (error) {
    console.error('Airtable Error:', error);
    throw error;
  }
}