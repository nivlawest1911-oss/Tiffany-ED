import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * EdIntel Data Uplink: Fetches high-fidelity media manifest from Supabase.
 * Replaces static JSON definitions with real-time district data.
 */
export async function fetchMediaManifest() {
    const { data, error } = await supabase
        .from('media_manifest')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[SUPABASE_ERROR] Failed to harvest media manifest:', error);
        return [];
    }

    return data;
}

/**
 * Strategic Sync: Stores generated IEP documents in the EdIntel Vault.
 */
export async function archiveStrategicDocument(userId: string, title: string, content: any, type: string) {
    const { data, error } = await supabase
        .from('strategic_vault')
        .insert([
            {
                user_id: userId,
                title,
                content,
                type,
                clearance: 'EdIntel'
            }
        ])
        .select();

    if (error) {
        console.error('[SUPABASE_ERROR] Failed to archive document:', error);
        return null;
    }

    return data[0];
}
/**
 * 🏛️ EdIntel Audit Link: Logs neural synthesis events for institutional compliance.
 */
export async function logAiEvent(generatorId: string, prompt: string, status: string = 'SUCCESS') {
    const { error } = await supabase
        .from('audit_logs')
        .insert([{
            event: 'AI_SYNTHESIS',
            generator: generatorId,
            prompt_preview: prompt.substring(0, 100),
            status,
            architecture: 'GCP_GEMINI_1.5_PRO',
            timestamp: new Date().toISOString()
        }]);

    if (error) {
        console.warn('[SUPABASE_ERROR] Audit log sync delayed:', error);
    }
}

/**
 * 🎯 Institutional Outreach: Captures school site provisioning requests.
 */
export async function submitLead(email: string, schoolName: string, source: string = 'Digital Portal') {
    const { data, error } = await supabase
        .from('leads')
        .insert([{
            email,
            school_name: schoolName,
            source,
            status: 'IDENTIFIED'
        }])
        .select();

    if (error) {
        console.error('[SUPABASE_ERROR] Lead ingestion failed:', error);
        return null;
    }

    return data[0];
}

/**
 * 🛰️ EdIntel Support Uplink: Transmits teacher feedback to the institutional memory core.
 */
export async function createSupportTicket(userId: string, subject: string, message: string, priority: string = 'STANDARD') {
    const { data, error } = await supabase
        .from('support_tickets')
        .insert([{
            user_id: userId,
            subject,
            message,
            priority,
            status: 'OPEN',
            timestamp: new Date().toISOString()
        }])
        .select();

    if (error) {
        console.error('[SUPABASE_ERROR] Support ingestion failed:', error);
        return null;
    }

    return data[0];
}
