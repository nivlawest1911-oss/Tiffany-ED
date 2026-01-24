
export interface SovereignProtocol {
    context: string;
    message: string;
    videoBehavior: 'idle' | 'attentive' | 'focus' | 'alert';
    suggestedAction?: string;
    actionLabel?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

export const SOVEREIGN_PROTOCOLS: Record<string, SovereignProtocol> = {
    '/': {
        context: 'SOVEREIGN LEGACY',
        message: 'Welcome back, Executive. Grounded in the resilience of Prichard 1925 and the legacy of Africatown, EdIntel stands ready. I am calibrating all systems to maintain the standard of excellence established by pioneers like Dr. H. Roger Williams.',
        videoBehavior: 'idle',
        suggestedAction: '/generators',
        actionLabel: 'Deploy Heritage Agents',
        abilityType: 'strategy'
    },
    '/generators': {
        context: 'NEURAL TOOL NEXUS',
        message: 'Accessing the Generator Matrix. Choose a specialized protocol—IEP Architecture, Fiscal Analysis, or Curriculum Design—to begin.',
        videoBehavior: 'attentive',
        abilityType: 'strategy'
    },
    '/generators/iep-architect': {
        context: 'COMPLIANCE SHIELD',
        message: 'IEP Architect active. This tool uses Level 4 Neural Compliance standards to draft legally defensible plans. Shall we review the latest IDEA updates?',
        videoBehavior: 'focus',
        suggestedAction: 'https://sites.ed.gov/idea/',
        actionLabel: 'Verify IDEA Statutes',
        abilityType: 'compliance'
    },
    '/generators/district-budget': {
        context: 'FISCAL SOLVENCY',
        message: 'Financial protocols engaged. I can analyze budget vectors to identify optimize ROI and capital recovery opportunities.',
        videoBehavior: 'focus',
        abilityType: 'analytics'
    },
    '/generators/curriculum-calibration': {
        context: 'INSTRUCTIONAL CORE',
        message: 'Curriculum Calibration online. Let us align instructional frameworks with high-fidelity state standards to maximize student efficacy.',
        videoBehavior: 'focus',
        abilityType: 'curriculum'
    },
    '/dashboard': {
        context: 'DATA OVERWATCH',
        message: 'Dashboard visualization loaded. Cross-referencing attendance, discipline, and academic metrics for executive review.',
        videoBehavior: 'alert',
        abilityType: 'analytics'
    },
    '/settings': {
        context: 'SYSTEM CONFIG',
        message: 'Accessing user preferences. Here you can calibrate your voice clone, update security credentials, and manage subscription tiers.',
        videoBehavior: 'idle'
    },
    '/profile': {
        context: 'IDENTITY MATRIX',
        message: 'Identity profile loaded. Ensure your professional credentials and certifications are up to date for precise document generation.',
        videoBehavior: 'idle'
    },
    '/pricing': {
        context: 'FISCAL STRATEGY',
        message: 'Accessing the Investment Matrix. Here you can authorize capital allocation for Sovereign Level AI protocols to maximize district ROI.',
        videoBehavior: 'attentive'
    }
};

export const DEFAULT_PROTOCOL: SovereignProtocol = {
    context: 'SYSTEM STANDBY',
    message: 'Sovereign Agent active and awaiting command. How can I assist you?',
    videoBehavior: 'idle'
};
