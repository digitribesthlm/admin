 export async function airtablePost(baseId, tableId, data, token) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: [
        {
          fields: data.fields
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create record');
  }

  return response.json();
}

export async function airtableGet(baseId, tableId, token) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch records');
  }

  return response.json();
}