import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a marketing expert creating detailed marketing personas. Return ONLY a JSON object in the following format (no additional text):
{
  "personas": [
    {
      "name": "string (e.g., 'The Family Gamer')",
      "demographics": {
        "ageAndGender": "string (e.g., '45-54, Male or Female')",
        "location": "string",
        "interests": ["string"],
        "car": "string",
        "housing": "string"
      },
      "needs": {
        "wants": ["string (3 needs from the provided categories)"],
        "avoids": ["string (3 things to avoid)"]
      },
      "communicationAngles": [
        {
          "angle": "string",
          "customerResponses": ["string"]
        }
      ]
    }
  ]
}`;

const NEEDS_CATEGORIES = [
  ["Freedom", "Strength", "Respected"],
  ["Unique experience", "Success", "Admiration"],
  ["Smart", "Secure", "Private"],
  ["Attractive", "Social", "Comfort"],
  ["Enabler - take care of others"]
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      companyDescription, 
      audienceData, 
      numPersonas = 3,
      language = 'sv' 
    } = req.body;

    if (!companyDescription) {
      return res.status(400).json({ 
        error: 'Company description is required' 
      });
    }

    const userPrompt = `Create ${numPersonas} detailed marketing personas for:

Company Description: ${companyDescription}
Audience Data: ${audienceData || 'Not provided'}

For each persona:
1. Include demographics (age, gender, location, interests, transportation, housing)
2. Select 3 needs from these categories: ${JSON.stringify(NEEDS_CATEGORIES)}
3. Include 3 things they want to avoid
4. Create 3 communication angles with examples
5. Generate 5 headlines and 5 descriptions in ${language === 'sv' ? 'Swedish' : 'English'}

Make the personas diverse but realistic for the target market.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return res.status(200).json(response);

  } catch (error) {
    console.error('Error in personas-generator:', error);
    return res.status(500).json({ 
      error: 'Failed to generate personas',
      details: error.message 
    });
  }
} 