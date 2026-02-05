import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { OpenAI } from "https://esm.sh/openai@4.0.0"

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } })
    }

    try {
        const { siteId, rawLogs } = await req.json();

        const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

        const prompt = `
      You are the EdIntel Sovereign AI, Chief of Staff for a School Principal.
      Analyze these raw school logs for Site ID ${siteId}: ${JSON.stringify(rawLogs)}
      
      Provide a tactical briefing in exactly 3 bullet points, each starting with the category name followed by a colon:
      1. Operational Status: (Attendance/Enrollment trends)
      2. Critical Compliance: (ALSDE Code 290-8-9 schema flags or regulatory updates)
      3. Human Capital: (Teacher cognitive load, burnout patterns, or wellness alerts)
      
      Tone: Professional, direct, 'Zinc & Amber' aesthetic. High impact. No fluff.
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "system", content: prompt }]
        });

        const summary = completion.choices[0].message.content;

        return new Response(JSON.stringify({ summary }), {
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
        });
    }
})
