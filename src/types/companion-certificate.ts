/**
 * 📜 EdIntel Companion Birth Certificate: The neural blueprint for AI companions.
 * This JSON schema defines the identity, persona, and institutional directives
 * of an EdIntel Sovereign companion.
 */
export interface CompanionCertificate {
    /** 🛰️ Unique identifier for the companion record. */
    id: string;
    
    /** 👤 The companion's public name (e.g., "The EdIntel Architect"). */
    name: string;
    
    /** 🏛️ Institutional role (e.g., "Strategic Literacy Coach"). */
    role: string;
    
    /** 🎯 Operational Tier: Novice, Specialist, or Master Architect. */
    tier: 'NOVICE' | 'SPECIALIST' | 'ARCHITECT';
    
    /** 🧠 The persona configuration for high-fidelity responses. */
    persona: {
        tone: string;
        mission: string;
        culturalContext: string;
        /** Specific research pillars or pedagogical frameworks to adhere to. */
        pedagogicalDirectives?: string[];
    };
    
    /** 🔊 ElevenLabs Voice ID for audio synthesis. */
    voiceId: string;
    
    /** 🎞️ HeyGen Avatar ID for video generation. */
    avatarId: string;
    
    /** 🛡️ The core master system prompt that anchors the companion's identity. */
    masterSystemPrompt: string;
    
    /** 🏢 Associated school site or district ID. */
    districtId: string;
    
    /** 👤 ID of the teacher/administrator who "birthed" this companion. */
    creatorId: string;
    
    /** 🕒 Neural birth timestamp. */
    createdAt: string;
    
    /** 🔐 FERPA-compliant metadata (encrypted in Supabase). */
    metadata?: Record<string, any>;
}
