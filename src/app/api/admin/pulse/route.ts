import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGoogleAIKey, AI_MODELS } from '@/lib/ai-config';

export const dynamic = 'force-dynamic';

export async function GET() {
    const status = {
        database: { label: 'Supabase Memory Cluster', online: false },
        ai_core: { label: 'Gemini Neural Core', online: false },
        backup_node: { label: 'GCS Cold Vault', online: true }, // Mocked for UI, verified via GitHub Action
    };

    try {
        if (supabase) {
            const { error: dbError } = await supabase.from('media_manifest').select('id', { count: 'exact', head: true }).limit(1);
            if (!dbError) status.database.online = true;
        }

        // Check AI Core Connectivity using canonical resolver
        const apiKey = getGoogleAIKey();
        if (apiKey) {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: AI_MODELS.GOOGLE.FLASH });
            // Minimal connectivity handshake
            await model.generateContent({ contents: [{ role: 'user', parts: [{ text: 'pulse' }] }] });
            status.ai_core.online = true;
        }
    } catch (e) {
        console.warn("[EdIntel_PULSE] System diagnostic interrupted:", e);
    }

    return NextResponse.json({
        timestamp: new Date().toISOString(),
        clearance: 'EdIntel',
        nodes: status
    });
}
