
export interface SovereignProtocol {
    context: string;
    message: string;
    videoBehavior: 'idle' | 'attentive' | 'focus' | 'alert';
    suggestedAction?: string;
    actionLabel?: string;
}

export const SOVEREIGN_PROTOCOLS: Record<string, SovereignProtocol> = {
    '/': {
        context: 'EXECUTIVE COMMAND',
        message: 'Welcome back, Executive. All systems are operating at peak efficiency. I am ready to deploy Sovereign Agents to assist with your strategic objectives.',
        videoBehavior: 'idle',
        suggestedAction: '/generators',
        actionLabel: 'Deploy Agents'
    },
    '/generators': {
        context: 'NEURAL TOOL NEXUS',
        message: 'Accessing the Generator Matrix. Choose a specialized protocol—IEP Architecture, Fiscal Analysis, or Curriculum Design—to begin.',
        videoBehavior: 'attentive'
    },
    '/generators/iep-architect': {
        context: 'COMPLIANCE SHIELD',
        message: 'IEP Architect active. This tool uses Level 4 Neural Compliance standards to draft legally defensible plans. Shall we review the latest IDEA updates?',
        videoBehavior: 'focus',
        suggestedAction: 'https://sites.ed.gov/idea/',
        actionLabel: 'Verify IDEA Statutes'
    },
    '/generators/district-budget': {
        context: 'FISCAL SOLVENCY',
        message: 'Financial protocols engaged. I can analyze budget vectors to identify optimize ROI and capital recovery opportunities.',
        videoBehavior: 'focus'
    },
    '/generators/curriculum-calibration': {
        context: 'INSTRUCTIONAL CORE',
        message: 'Curriculum Calibration online. Let us align instructional frameworks with high-fidelity state standards to maximize student efficacy.',
        videoBehavior: 'focus'
    },
    '/dashboard': {
        context: 'DATA OVERWATCH',
        message: 'Dashboard visualization loaded. Cross-referencing attendance, discipline, and academic metrics for executive review.',
        videoBehavior: 'alert'
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
    }
};

export const DEFAULT_PROTOCOL: SovereignProtocol = {
    context: 'SYSTEM STANDBY',
    message: 'Sovereign Agent active and awaiting command. How can I assist you?',
    videoBehavior: 'idle'
};
