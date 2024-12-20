import { airtableGet, airtablePost } from '../../lib/airtable'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await airtableGet(
        process.env.AIRTABLE_BASE_ID_SALES,
        process.env.AIRTABLE_TABLE_ID_SALES,
        process.env.AIRTABLE_SECRET_TOKEN
      )
      res.status(200).json(response)
    } catch (error) {
      console.error('Airtable Error:', error)
      res.status(500).json({ error: 'Failed to fetch records' })
    }
  } else if (req.method === 'POST') {
    try {
      const response = await airtablePost(
        process.env.AIRTABLE_BASE_ID_SALES,
        process.env.AIRTABLE_TABLE_ID_SALES,
        req.body,
        process.env.AIRTABLE_SECRET_TOKEN
      )

      res.status(200).json(response)
    } catch (error) {
      console.error('Airtable Error:', error)
      res.status(500).json({ error: 'Failed to create record' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}