import { NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini-service';

export async function POST(req: Request) {
    try {
        const params = await req.json();
        const content = await geminiService.generateCodeSnippet(params);
        return NextResponse.json({ content });
    } catch (error: any) {
        console.error("[API Code Snippet Error]:", error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            return NextResponse.json({
                content: `// [SIMULATION PROTOCOL ACTIVE]
// AI Capacity is currently exhausted. Displaying mock data.

function helloWorld() {
    console.log("Strategic alignment stabilized. Awaiting neural uplink.");
}

/* Educator's Note:
 * This is a simulated response due to API rate limits. 
 * Please try your request again in a few moments.
 */`
            });
        }

        return NextResponse.json({ error: error.message || "Failed to generate code" }, { status: 500 });
    }
}
