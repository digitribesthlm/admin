import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ANALYSIS_PROMPT = `Analyze the provided text for human vs. AI characteristics using these metrics, scoring each 0-100 (where higher scores indicate more human-like characteristics):

1. Natural Language Flow (Weight: 0.30)
2. Context Coherence (Weight: 0.25)
3. Stylistic Authenticity (Weight: 0.20)
4. Structural Patterns (Weight: 0.15)
5. Purpose Alignment (Weight: 0.10)

Return your analysis in valid JSON format with exactly this structure:
{
  "natural_language_flow": number,
  "natural_language_flow_notes": string,
  "context_coherence": number,
  "context_coherence_notes": string,
  "stylistic_authenticity": number,
  "stylistic_authenticity_notes": string,
  "structural_patterns": number,
  "structural_patterns_notes": string,
  "purpose_alignment": number,
  "purpose_alignment_notes": string,
  "final_analysis": string,
  "confidence_level": number,
  "weighted_score": number
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text, url } = req.body;
    let contentToAnalyze = text;

    // If URL is provided, scrape the content
    if (url) {
      console.log('Received URL:', url);
      
      if (!process.env.JINA_API_KEY) {
        return res.status(400).json({ error: 'JINA_API_KEY is not configured' });
      }

      try {
        console.log('Attempting to scrape with Jina AI...');
        const scrapeResponse = await fetch(`https://r.jina.ai/${url}`, {
          headers: { 'Authorization': `Bearer ${process.env.JINA_API_KEY}` }
        });

        console.log('Jina AI response status:', scrapeResponse.status);
        
        if (!scrapeResponse.ok) {
          throw new Error('Failed to scrape website');
        }

        contentToAnalyze = await scrapeResponse.text();
        console.log('Content retrieved, length:', contentToAnalyze.length);
      } catch (scrapeError) {
        console.error('Scraping error:', scrapeError);
        return res.status(500).json({ 
          error: 'Failed to scrape website content',
          details: scrapeError.message 
        });
      }
    }

    // Validate content
    if (!contentToAnalyze || contentToAnalyze.length < 10) {
      return res.status(400).json({ 
        error: 'Content is required and must be at least 10 characters long' 
      });
    }

    console.log('Starting OpenAI analysis...');
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: ANALYSIS_PROMPT
        },
        {
          role: "user",
          content: contentToAnalyze
        }
      ],
      temperature: 0.7
    });

    console.log('OpenAI response received');
    const analysisText = completion.choices[0].message.content;
    
    try {
      const analysis = JSON.parse(analysisText);
      
      // Calculate the AI score as inverse of the weighted score
      // If weighted_score is high (more human-like), total_ai_score should be low
      const total_ai_score = Math.max(0, Math.min(100, 100 - analysis.weighted_score));
      
      // Add source information and AI score to the response
      const response = {
        ...analysis,
        total_ai_score,
        source: url ? { type: 'url', value: url } : { type: 'text', value: 'Direct input' }
      };

      // Validate the response has all required fields
      const requiredFields = [
        'natural_language_flow',
        'context_coherence',
        'stylistic_authenticity',
        'structural_patterns',
        'purpose_alignment',
        'confidence_level'
      ];

      const missingFields = requiredFields.filter(field => !(field in analysis));
      if (missingFields.length > 0) {
        console.error('Missing fields in OpenAI response:', missingFields);
        throw new Error(`Invalid response format. Missing fields: ${missingFields.join(', ')}`);
      }

      return res.status(200).json(response);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return res.status(500).json({
        error: 'Failed to parse analysis results',
        details: parseError.message,
        rawResponse: analysisText
      });
    }

  } catch (error) {
    console.error('Error in analyze-text:', error);
    return res.status(500).json({ 
      error: 'Analysis failed',
      details: error.message 
    });
  }
} 