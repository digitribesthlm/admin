import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a Facebook Ad expert. Analyze the provided content and create 10 engaging ad variations following these rules:

1. Each ad should contain:
   - Headline (max 40 characters)
   - Primary text (compelling hook, max 125 characters)
   - Description (detailed explanation, max 30 words)
   - Relevant emoji for each section

2. Use these engagement techniques:
   - Curiosity and excitement
   - Clear, direct messages
   - Emotional triggers
   - Specific numbers/details
   - Sense of urgency
   - Controversy (when appropriate)
   - Relatability
   - Varied formats

3. Include these elements:
   - Interesting person/story
   - Biggest advantage
   - Positive words
   - Numbers
   - News angles
   - Direct questions
   - Interesting facts
   - Quotation marks

Return the response in this JSON format:
{
  "ads": [
    {
      "headline": "string",
      "primary_text": "string",
      "description": "string",
      "emojis": {
        "headline": "string",
        "primary": "string",
        "description": "string"
      }
    }
  ]
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, url, numAds = 5 } = req.body;
    let contentToAnalyze = content;

    // Update the system prompt to include the number of ads
    const customPrompt = SYSTEM_PROMPT.replace(
      'create 10 engaging ad variations',
      `create ${numAds} engaging ad variations`
    );

    // If URL is provided, scrape the content
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: customPrompt
        },
        {
          role: "user",
          content: contentToAnalyze
        }
      ],
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return res.status(200).json(response);

  } catch (error) {
    console.error('Error in facebook-ad-generator:', error);
    return res.status(500).json({ 
      error: 'Failed to generate ads',
      details: error.message 
    });
  }
} 