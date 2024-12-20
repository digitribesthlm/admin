import { airtableGet, airtablePost } from '../../lib/airtable'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

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
} 