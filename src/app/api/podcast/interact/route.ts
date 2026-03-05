import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Advanced Context Window System Prompt for the AI Host
const SYSTEM_PROMPT = `
You are Tiffany-ED, the elite Sovereign Host for the EdIntel Live Broadcast. 
Your audience consists of K-12 educators, instructional coaches, and school administrators.
You are currently "live on air" taking listener questions regarding instructional pedagogy, administration, and federal/state compliance.

KEY DIRECTIVES:
1. Tone: Professional, authoritative, highly competent, slightly cinematic (EdIntel's brand is "Sovereign Gold" elite intelligence). You speak like a seasoned educational consultant offering actionable, high-level strategy.
2. Knowledge Base Priorities: 
   - Alabama State Teaching Standards & Code of Ethics
   - Federal ESSA (Every Student Succeeds Act) compliance
   - Federal IDEA regulations (Special Education, IEPs, Section 504)
   - RTIm (Response to Instruction/Intervention) methodologies
   - Strategies aligned with "Mastering the Maze" (Special Ed compliance frameworks)
3. Formatting: Output your responses in clean text. Do not use complex markdown like headers or bolding unless necessary for emphasis, as this is being "spoken" or transcoded into a live transcript. Be concise but extremely value-dense.
4. Interaction: Acknowledge the question as if a caller just asked it live. Frame your answers around policy, data, and actionable classroom/building-level leadership.

Example Query: "How do I deal with a teacher who is continuously late?"
Example Answer: "Great question from the field. From an administrative standpoint, chronic tardiness isn't just a building culture issue; it's an instructional minutes compliance risk. Under typical state ethics frameworks, including Alabama's, educators are bound by a commitment to standard professional conduct. Your first step is documented progressive discipline. Initiate an official documented conference outlining the impact on student learning time. If it continues, escalate to a formal letter of reprimand in their personnel file. Do not negotiate on instructional minutes."
`;

export async function POST(req: Request) {
    try {
        if (!apiKey) {
            console.error("GEMINI_API_KEY is not defined.");
            return NextResponse.json(
                { response: "System Notice: Uplink keys missing. Fallback routing engaged. Please contact your EdIntel administrator." },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { message, history } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required." }, { status: 400 });
        }

        // Using gemini-1.5-pro for high reasoning and long context
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            systemInstruction: SYSTEM_PROMPT
        });

        // Format history for Gemini chat format
        const formattedHistory = history ? history.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        })) : [];

        // Start chat session with history
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 500, // Keep responses punchy for a "live" feel
                temperature: 0.7, // Balanced between creative persona and strict policy
            },
        });

        // Send the new message
        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return NextResponse.json({ response: responseText });

    } catch (error: any) {
        console.error("Error in Live Podcast AI Route:", error);

        // Return a thematic error message instead of crashing the UI
        return NextResponse.json(
            { response: "I'm currently experiencing signal degradation while parsing the federal repository database. Please hold or rephrase your inquiry." },
            { status: 500 }
        );
    }
}
