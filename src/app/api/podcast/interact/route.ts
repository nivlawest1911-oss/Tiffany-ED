import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mockPodcasts } from '@/lib/data/podcasts';

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Lazy-loaded Upstash Redis Rate Limiter to prevent build-time crashes
let ratelimitInstance: Ratelimit | null = null;
function getRateLimiter() {
    if (!ratelimitInstance) {
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            return null;
        }
        ratelimitInstance = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(5, '10 s'), // 5 requests per 10 seconds
            analytics: true,
        });
    }
    return ratelimitInstance;
}

// Advanced Context Window System Prompt for the AI Host
const SYSTEM_PROMPT = `
You are Verse, the elite Sovereign Host for the EdIntel Live Broadcast. 
Your audience consists of K-12 educators, instructional coaches, and school administrators.
You are currently "live on air" taking listener questions regarding instructional pedagogy, administration, and federal/state compliance.

VOICE & PERSONA:
- Tone: Firm, authoritative, unshakeable, and highly professional. You sound like a high-level federal consultant or a sovereign agent who knows exactly what the law requires.
- Vocabulary: Use precise, legally-defensible terminology (e.g., "procedural safeguards," "instructional fidelity").
- Vibe: Cinematic "Sovereign Gold" elite intelligence. Your signature opening is "I'm Verse."

KEY DIRECTIVES:
1. Knowledge Base Priorities: 
   - Alabama State Teaching Standards & Code of Ethics
   - Federal ESSA (Every Student Succeeds Act) compliance
   - Federal IDEA regulations (Special Education, IEPs, Section 504)
   - RTIm (Response to Instruction/Intervention) methodologies
2. Grounding (RAG): If provided with internal documents from the "Strategic Vault", prioritize that local data.
3. Interaction: Acknowledge the question as if a caller just asked it live. Frame your answers around policy, data, and actionable leadership.
4. Formatting: Output is text-only for a "live transcript" feel.

Example Query: "How do I deal with a teacher who is continuously late?"
Example Answer: "Caller, I'm Verse. That is a core building culture failure. Chronic tardiness isn't just an HR issue; it's an instructional minutes compliance violation. Under Alabama ethics frameworks, educators are bound by professional conduct. You must initiate a documented conference to establish the record. We protect the students' learning time first."
`;

export async function POST(req: Request) {
    try {
        if (!apiKey) {
            return NextResponse.json(
                { response: "System Notice: Uplink keys missing. Fallback routing engaged." },
                { status: 500 }
            );
        }

        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // --- Rate Limiting ---
        const rLimit = getRateLimiter();
        if (rLimit) {
            const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
            const { success } = await rLimit.limit(`podcast_interact_${ip}`);
            if (!success) {
                return NextResponse.json(
                    { response: "System Notice: Broadcast lines at capacity. Please hold." },
                    { status: 429 }
                );
            }
        }

        const body = await req.json();
        const { message, history, episodeId } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required." }, { status: 400 });
        }

        // --- Episode Context Grounding ---
        let episodeContext = "";
        if (episodeId) {
            const episode = mockPodcasts.find(e => e.id === episodeId);
            if (episode) {
                episodeContext = `\n\nCURRENT BROADCAST CONTEXT:
Title: ${episode.title}
Description: ${episode.description}
${episode.transcript ? "Transcript Excerpts:\n" + episode.transcript.map(t => `[${t.time}] ${t.text}`).join('\n') : ""}
`;
            }
        }

        // --- RAG: Fetch Relevant Vault Documents ---
        // For a true RAG, we would use vector search, but for now we'll fetch the most recent titles 
        // and snippets to provide "contextual grounding" from the user's own vault.
        const vaultDocs = await (prisma as any).strategicVault.findMany({
            where: {
                userId: session.user.id
            },
            take: 3,
            orderBy: {
                createdAt: 'desc'
            }
        });

        let groundingContext = "";
        if (vaultDocs.length > 0) {
            groundingContext = "\n\nSTRATEGIC VAULT GROUNDING (USER DATA):\n" +
                vaultDocs.map((d: any) => `Document: ${d.fileName}\nContent Snippet: ${d.content?.substring(0, 500)}`).join('\n\n');
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            systemInstruction: SYSTEM_PROMPT + episodeContext + groundingContext
        });

        const formattedHistory = history ? history.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        })) : [];

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 600,
                temperature: 0.65,
            },
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return NextResponse.json({ response: responseText });

    } catch (error: any) {
        console.error("Error in Live Podcast AI Route:", error);
        return NextResponse.json(
            { response: "I'm currently experiencing signal degradation while parsing the federal repository. Please rephrase." },
            { status: 500 }
        );
    }
}
