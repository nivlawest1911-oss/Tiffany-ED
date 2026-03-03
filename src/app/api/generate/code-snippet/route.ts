import { NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini-service';

export async function POST(req: Request) {
    try {
        const params = await req.json();
        const content = await geminiService.generateCodeSnippet(params);
        return NextResponse.json({ content });
    } catch (error: any) {
        console.error("[API Code Snippet Error]:", error);
        return NextResponse.json({ error: error.message || "Failed to generate code" }, { status: 500 });
    }
}
