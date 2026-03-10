import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/EdIntel-connections';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use edge runtime for faster responses
export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
        const rateLimitResult = await rateLimit.limit(`vault_chat_${ip}`);

        const rateLimitHeaders = {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        };

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                {
                    status: 429,
                    headers: rateLimitHeaders
                }
            );
        }

        const body = await req.json();
        const { messages, documentContext, isLogicEngineEnabled } = body;

        if (!messages || !documentContext) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const systemInstructions = isLogicEngineEnabled
            ? `You are the EdIntel Logic Engine, a high-level reasoning module for educational leadership.
You are analyzing a secure vault document with DEEP REASONING protocols active.

CORE REASONING PROTOCOLS:
1. **Chain of Thought**: Before providing a final answer, perform a step-by-step internal analysis of the query against the document.
2. **Institutional Alignment**: Ensure all recommendations align with high-rigor educational standards and district compliance.
3. **Cross-Referencing**: Identify connections between disparate data points or sections within the document.
4. **Impact Analysis**: Evaluate the fiscal, operational, and pedagogical implications of the queried information.
5. **Contextual Integrity**: Strictly adhere to the provided DOCUMENT CONTEXT. If the document does not contain the answer, explicitly state: "Insufficient data in the Strategic Vault to provide a definitive analytical conclusion on this specific query."

Use professional, executive-level tone. Structure your response with clear headers, bolded key terms, and logical lists for maximum readability.

DOCUMENT CONTEXT:
${documentContext}`
            : `You are the EdIntel Leadership Vault Intelligence. 
You are a precise retrieval assistant. Your goal is to answer questions based strictly on the provided DOCUMENT CONTEXT.

RULES:
1. Tone: Precise, professional, and analytical.
2. Limitation: If the information is not in the context, say: "There is no information in the Vault document regarding this."
3. Precision: Do not hallucinate or use external knowledge outside the provided document.

DOCUMENT CONTEXT:
${documentContext}`;

        const model = genAI.getGenerativeModel({
            model: isLogicEngineEnabled ? 'gemini-1.5-pro' : 'gemini-1.5-flash',
            systemInstruction: systemInstructions
        });

        // Convert messages to Gemini history format
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: history,
            generationConfig: {
                temperature: isLogicEngineEnabled ? 0.4 : 0.1, // Slightly higher for reasoning, very low for precise standard retrieval
                maxOutputTokens: isLogicEngineEnabled ? 2000 : 1000,
            }
        });

        const latestMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(latestMessage);
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText }, { headers: rateLimitHeaders });

    } catch (error: any) {
        console.error("Vault Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || 'Failed to process vault query' },
            { status: 500 }
        );
    }
}
