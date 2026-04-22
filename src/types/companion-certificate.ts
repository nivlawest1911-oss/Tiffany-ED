/**
 * ðŸ“œ EdIntel Companion Birth Certificate: The neural blueprint for AI companions.
 * This JSON schema defines the identity, persona, and institutional directives
 * of an EdIntel Sovereign companion.
 */
export interface CompanionCertificate {
    /** ðŸ›°ï¸ Unique identifier for the companion record. */
    id: string;
    
    /** ðŸ‘¤ The companion's public name (e.g., "The EdIntel Architect"). */
    name: string;
    
    /** ðŸ›ï¸ Institutional role (e.g., "Strategic Literacy Coach"). */
    role: string;
    
    /** ðŸŽ¯ Operational Tier: Novice, Specialist, or Master Architect. */
    tier: 'NOVICE' | 'SPECIALIST' | 'ARCHITECT';
    
    /** ðŸ§  The persona configuration for high-fidelity responses. */
    persona: {
        tone: string;
        mission: string;
        culturalContext: string;
        /** Specific research pillars or pedagogical frameworks to adhere to. */
        pedagogicalDirectives?: string[];
    };
    
    /** ðŸ”Š ElevenLabs Voice ID for audio synthesis. */
    voiceId: string;
    
    /** ðŸŽžï¸ HeyGen Avatar ID for video generation. */
    avatarId: string;
    
    /** ðŸ›¡ï¸ The core master system prompt that anchors the companion's identity. */
    masterSystemPrompt: string;
    
    /** ðŸ¢ Associated school site or district ID. */
    districtId: string;
    
    /** ðŸ‘¤ ID of the teacher/administrator who "birthed" this companion. */
    creatorId: string;
    
    /** ðŸ•’ Neural birth timestamp. */
    createdAt: string;
    
    /** ðŸ” FERPA-compliant metadata (encrypted in Supabase). */
    metadata?: Record<string, any>;
}
