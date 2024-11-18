import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const STYLE_EXAMPLE = `Du förstod det korrekt. Det är bråttom. Samtidigt som vi har en stark ekonomisk press på oss. Blir alltid ett moment 22 i den här typen av sammanhang. Vikande intäkter (väldigt trögt nu) kräver ökade investeringar på varumärkes/marknadsföringssidan samtidigt som en ökad kostnadsmassa måste hanteras med mindre tillgängliga medel. Klurigt det där.  

Vi har som jag skrev nu sagt upp vår tidigare digitala partner, men sitter enligt avtal på 1 månads uppsägningstid, dvs deras retainer ska betalas även under mars månad. Har dessvärre ingen möjlighet att ligga på dubbla kostnader i det avseendet. Därav start av samarbete med dig från och med april även om vi självklart hade föredragit att kunna dra igång själva grundarbetet direkt.

Förstår din poäng om mer tid för att starta upp och sätta fundamentet på plats, mindre tid för att "förvalta" när detta jobb väl är gjort. Så låt oss göra så. 3 månaders uppstartsperiod (april tom jun) till ditt offererade arvode om/månad , därefter gemensam utvärdering samt beslut kring hur det fortsatta upplägget ska se ut. Förhoppningsvis har det tagit ny fart då.`;

const SYSTEM_PROMPT = `Du är en professionell copywriter som ska hjälpa till att skriva mail med samma ton och stil som exemplet nedan. Exemplet visar den önskade kommunikationsstilen:

${STYLE_EXAMPLE}

Viktiga stilistiska element att behålla:
- Professionell men personlig ton
- Rak och tydlig kommunikation
- Balanserad optimism med realism
- Affärsmässig men inte formell
- Inkluderande språk ("vi", "låt oss")
- Erkänner utmaningar men fokuserar på lösningar

Omformulera användarens text med denna stil.`;

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