import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

export async function GET() {
    const status = {
        database: { label: 'Supabase Memory Cluster', online: false },
        ai_core: { label: 'Gemini Neural Core', online: false },
        backup_node: { label: 'GCS Cold Vault', online: true }, // Mocked for UI, verified via GitHub Action
    };

    try {
        // 🏛️ Check Database Connectivity
        // We attempt a lightweight metadata fetch instead of a full table scan
        const { error: dbError } = await supabase.from('media_manifest').select('id', { count: 'exact', head: true }).limit(1);
        if (!dbError) status.database.online = true;

        // 🧠 Check AI Core Connectivity
        const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
        if (apiKey) {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            // Minimal connectivity handshake
            await model.generateContent({ contents: [{ role: 'user', parts: [{ text: 'pulse' }] }] });
            status.ai_core.online = true;
        }
    } catch (e) {
        console.warn("[SOVEREIGN_PULSE] System diagnostic interrupted:", e);
    }

    return NextResponse.json({
        timestamp: new Date().toISOString(),
        clearance: 'Sovereign',
        nodes: status
    });
}
