import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * 🎬 Sovereign Media Manifest API
 * Dynamically harvests high-fidelity `.mp4` video directives from the Supabase Memory Core.
 * Replaces static file-based routing with real-time district media synchronization.
 */
export async function GET() {
    try {
        const { data: media, error } = await supabase
            .from('media_manifest')
            .select('*')
            .eq('status', 'optimized')
            .order('priority', { ascending: false });

        if (error) throw error;

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            clearance: 'Sovereign',
            manifest: media || [],
            source: 'Supabase Memory Cluster'
        });

    } catch (err: any) {
        console.error('[MEDIA_SYNC_ERROR] Neural-link to media cluster failed:', err);
        return NextResponse.json({
            success: false,
            error: 'Media synchronization failed',
            details: err.message
        }, { status: 500 });
    }
}
