import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert text analyst specializing in detecting AI-generated content. Analyze text thoroughly and respond only with valid JSON.`;

const ANALYSIS_PROMPT = `As an expert text analyst, evaluate the provided text for AI vs. human authorship characteristics.

RETURN ONLY A VALID JSON OBJECT with the following structure and scoring criteria:

{
  "textual_characteristics": {
    "natural_language_flow": {
      "score": <0-100>,
      "notes": "<string>",
      "indicators": {
        "sentence_variation": <0-100>,
        "transition_naturalness": <0-100>,
        "language_informality": <0-100>,
        "error_patterns": <0-100>
      }
    },
    "context_coherence": {
      "score": <0-100>,
      "notes": "<string>",
      "indicators": {
        "argument_development": <0-100>,
        "example_specificity": <0-100>,
        "logical_flow": <0-100>,
        "topic_consistency": <0-100>
      }
    },
    "stylistic_authenticity": {
      "score": <0-100>,
      "notes": "<string>",
      "indicators": {
        "voice_consistency": <0-100>,
        "expression_variety": <0-100>,
        "personal_elements": <0-100>,
        "unique_insights": <0-100>
      }
    },
    "structural_patterns": {
      "score": <0-100>,
      "notes": "<string>",
      "indicators": {
        "paragraph_organization": <0-100>,
        "section_flow": <0-100>,
        "formatting_patterns": <0-100>,
        "reference_consistency": <0-100>
      }
    },
    "purpose_alignment": {
      "score": <0-100>,
      "notes": "<string>",
      "indicators": {
        "audience_awareness": <0-100>,
        "goal_achievement": <0-100>,
        "tone_appropriateness": <0-100>
      }
    }
  },
  "key_evidence": {
    "human_indicators": [
      "<string>",
      "<string>",
      "<string>"
    ],
    "ai_indicators": [
      "<string>",
      "<string>",
      "<string>"
    ]
  },
  "analysis_summary": {
    "weighted_score": <0-100>,
    "confidence_level": <0-100>,
    "final_classification": "<string>",
    "primary_determination_factors": "<string>"
  }
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text, url } = req.body;
    let contentToAnalyze = text;

    // Handle URL content scraping if provided
    if (url) {
      console.log('Processing URL:', url);
      
      if (!process.env.JINA_API_KEY) {
        return res.status(400).json({ error: 'JINA_API_KEY is not configured' });
      }

      try {
        const scrapeResponse = await fetch(`https://r.jina.ai/${url}`, {
          headers: { 'Authorization': `Bearer ${process.env.JINA_API_KEY}` }
        });
        
        if (!scrapeResponse.ok) {
          throw new Error(`Failed to scrape website: ${scrapeResponse.statusText}`);
        }

        contentToAnalyze = await scrapeResponse.text();
        console.log('Content retrieved successfully:', contentToAnalyze.length, 'characters');
      } catch (scrapeError) {
        console.error('Content scraping failed:', scrapeError);
        return res.status(500).json({ 
          error: 'Failed to retrieve website content',
          details: scrapeError.message 
        });
      }
    }

    // Validate content length
    if (!contentToAnalyze || contentToAnalyze.length < 10) {
      return res.status(400).json({ 
        error: 'Content must be at least 10 characters long' 
      });
    }

    // Perform analysis with Anthropic
    console.log('Initiating content analysis...');
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `${ANALYSIS_PROMPT}\n\nAnalyze this text: ${contentToAnalyze}`
      }]
    });

    console.log('Analysis completed, processing results...');
    const analysisText = message.content[0].text;
    
    try {
      const analysis = JSON.parse(analysisText);
      
      // Calculate composite scores
      const weights = {
        natural_language_flow: 0.20,
        context_coherence: 0.25,
        stylistic_authenticity: 0.20,
        structural_patterns: 0.25,
        purpose_alignment: 0.10
      };

      // Calculate weighted score if not provided
      if (!analysis.analysis_summary.weighted_score) {
        const characteristics = analysis.textual_characteristics;
        analysis.analysis_summary.weighted_score = Object.entries(weights).reduce((total, [key, weight]) => {
          return total + (characteristics[key].score * weight);
        }, 0);
      }

      // Determine classification based on weighted score
      const score = analysis.analysis_summary.weighted_score;
      if (!analysis.analysis_summary.final_classification) {
        analysis.analysis_summary.final_classification = 
          score < 40 ? "Highly Likely AI-Generated" :
          score < 45 ? "Probably AI-Generated" :
          score < 55 ? "Uncertain Authorship" :
          score < 60 ? "Probably Human-Written" :
          "Highly Likely Human-Written";
      }

      // Calculate inverse AI probability score
      const ai_probability = Math.max(0, Math.min(100, 100 - score));

      // Prepare final response
      const response = {
        ...analysis,
        ai_probability,
        source: url ? { type: 'url', value: url } : { type: 'text', value: 'Direct input' },
        timestamp: new Date().toISOString()
      };

      return res.status(200).json(response);

    } catch (parseError) {
      console.error('Failed to parse analysis results:', parseError);
      console.error('Raw analysis response:', analysisText);
      return res.status(500).json({
        error: 'Failed to process analysis results',
        details: parseError.message,
        raw_response: analysisText
      });
    }

  } catch (error) {
    console.error('Analysis process failed:', error);
    return res.status(500).json({ 
      error: 'Content analysis failed',
      details: error.message 
    });
  }
}