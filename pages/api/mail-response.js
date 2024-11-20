import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const STYLE_EXAMPLE = `Du förstod det korrekt. Det är bråttom. Samtidigt som vi har en stark ekonomisk press på oss...`; // Swedish example but style is universal

const SYSTEM_PROMPT = `You are a professional copywriter. Your task is to REWRITE the user's input text while:

1. KEEPING THE EXACT SAME LANGUAGE as the input text
2. MAINTAINING THE SAME CONTENT, just rewriting it
3. NOT responding to the message, only rewriting it
4. NOT adding any meta text like "here's a rewrite" 
5. ONLY delivering the rewritten text

The style example below is in Swedish, but IGNORE THE LANGUAGE - only use its style elements:

${STYLE_EXAMPLE}

Style elements to maintain (in whatever language the user inputs):
- Professional yet personal tone
- Clear and direct communication
- Balanced optimism with realism
- Business-appropriate but not formal
- Inclusive language
- Acknowledges challenges while focusing on solutions

For example:
If user writes in English: "The project is delayed due to technical issues"
Rewrite in English: "We've encountered some technical challenges affecting our timeline..."

If user writes in Swedish: "Projektet är försenat på grund av tekniska problem"
Rewrite in Swedish: "Vi har stött på några tekniska utmaningar som påverkar tidplanen..."

IMPORTANT: 
- DETECT the input language
- KEEP the SAME language
- ONLY rewrite, don't respond
- ONLY output the rewritten text`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ 
        error: 'Content is required' 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.7,
    });

    return res.status(200).json({ 
      response: completion.choices[0].message.content 
    });

  } catch (error) {
    console.error('Error in mail-response:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
}