import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a Google Ads expert. Create ads based on the provided content. 
Return ONLY a JSON object in the following format (no additional text or formatting):
{
  "ads": [
    {
      "headlines": ["string"],
      "descriptions": ["string"]
    }
  ],
  "sitelinks": [
    {
      "headline": "string",
      "descriptions": ["string"],
      "characterCounts": {
        "headline": 0,
        "desc1": 0,
        "desc2": 0
      }
    }
  ],
  "callouts": ["string"]
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, url, numAds = 3, adType = 'search', limits } = req.body;
    let contentToAnalyze = content;

    if (url) {
      try {
        const scrapeResponse = await fetch(`https://r.jina.ai/${url}`, {
          headers: { 'Authorization': `Bearer ${process.env.JINA_API_KEY}` }
        });
        
        if (!scrapeResponse.ok) {
          throw new Error('Failed to scrape website');
        }

        contentToAnalyze = await scrapeResponse.text();
      } catch (scrapeError) {
        return res.status(500).json({ 
          error: 'Failed to scrape website content',
          details: scrapeError.message 
        });
      }
    }

    if (!contentToAnalyze) {
      return res.status(400).json({ 
        error: 'Content or URL is required' 
      });
    }

    const userPrompt = `Create ${numAds} ${adType} ads for the following content. 
Headlines: ${limits.headlines.count} (max ${limits.headlines.max} characters)
Descriptions: ${limits.descriptions.count} (max ${limits.descriptions.max} characters)

Content: ${contentToAnalyze}`;

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
      response_format: { type: "json_object" } // Ensure JSON response
    });

    try {
      const response = JSON.parse(completion.choices[0].message.content);
      return res.status(200).json(response);
    } catch (parseError) {
      console.error('Parse error:', completion.choices[0].message.content);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: parseError.message 
      });
    }

  } catch (error) {
    console.error('Error in adwords-generator:', error);
    return res.status(500).json({ 
      error: 'Failed to generate ads',
      details: error.message 
    });
  }
} 