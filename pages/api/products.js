import { airtableGet } from '../../lib/airtable'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await airtableGet(
        process.env.AIRTABLE_BASE_ID_PRODUCTS,
        process.env.AIRTABLE_TABLE_ID_PRODUCTS,
        process.env.AIRTABLE_SECRET_TOKEN
      )
      res.status(200).json(response)
    } catch (error) {
      console.error('Airtable Error:', error)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
