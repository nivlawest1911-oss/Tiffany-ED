import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { CompanionCertificate } from '@/types/companion-certificate';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🏛️ Edintel SAFE_UPLINK: Returns null if configuration is missing to prevent crashes
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Edintel Data Uplink: Fetches high-fidelity media manifest from Supabase.
 * Replaces static JSON definitions with real-time district data.
 */
export const fetchMediaManifest = unstable_cache(
    async () => {
        if (!supabase) {
            console.warn('[EDINTEL_SAFE_UPLINK] Supabase offline. Media manifest unavailable.');
            return [];
        }
        const { data, error } = await supabase
            .from('media_manifest')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[SUPABASE_ERROR] Failed to harvest media manifest:', error);
            return [];
        }

        return data;
    },
    ['media_manifest'],
    { tags: ['media'] }
);

/**
 * Strategic Sync: Stores generated IEP documents in the Edintel Vault.
 */
export async function archiveStrategicDocument(userId: string, title: string, content: any, type: string) {
    if (!supabase) {
        console.warn('[EDINTEL_SAFE_UPLINK] Supabase offline. Document archive unavailable.');
        return null;
    }
    const { data, error } = await supabase
        .from('strategic_vault')
        .insert([
            {
                user_id: userId,
                title,
                content,
                type,
                clearance: 'Edintel'
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
 * 🏛️ Edintel Audit Link: Logs neural synthesis events for institutional compliance.
 */
export async function logAiEvent(generatorId: string, prompt: string, status: string = 'SUCCESS') {
    if (!supabase) return;
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
    if (!supabase) return null;
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
 * 🛰️ Edintel Support Uplink: Transmits teacher feedback to the institutional memory core.
 */
export async function createSupportTicket(userId: string, subject: string, message: string, priority: string = 'STANDARD') {
    if (!supabase) return null;
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

/**
 * 🛰️ Edintel Birth Certificate: Persists a new AI companion's DNA to the institutional core.
 */
export async function issueBirthCertificate(certificate: CompanionCertificate) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('companion_certificates')
        .insert([
            {
                id: certificate.id,
                name: certificate.name,
                role: certificate.role,
                tier: certificate.tier,
                persona: certificate.persona,
                voice_id: certificate.voiceId,
                avatar_id: certificate.avatarId,
                master_system_prompt: certificate.masterSystemPrompt,
                district_id: certificate.districtId,
                creator_id: certificate.creatorId,
                created_at: certificate.createdAt,
                metadata: certificate.metadata
            }
        ])
        .select();

    if (error) {
        console.error('[SUPABASE_ERROR] Failed to issue birth certificate:', error);
        return null;
    }

    return data[0];
}

/**
 * 🧠 Edintel Neural Link: Retrieves a specific companion's identity from the vault.
 */
export async function getBirthCertificate(companionId: string): Promise<CompanionCertificate | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('companion_certificates')
        .select('*')
        .eq('id', companionId)
        .single();

    if (error) {
        console.warn('[SUPABASE_ERROR] Neural link denied for ID:', companionId, error);
        return null;
    }

    // Map DB fields back to the interface
    return {
        id: data.id,
        name: data.name,
        role: data.role,
        tier: data.tier,
        persona: data.persona,
        voiceId: data.voice_id,
        avatarId: data.avatar_id,
        masterSystemPrompt: data.master_system_prompt,
        districtId: data.district_id,
        creatorId: data.creator_id,
        createdAt: data.created_at,
        metadata: data.metadata
    };
}
