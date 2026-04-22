export const ROUTES = {
    // Core
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    AUTH_CALLBACK: '/auth/callback',
    AUTH_ME: '/api/auth/me',

    // Dashboard
    DASHBOARD: '/the-room',
    THE_ROOM: '/the-room',
    AI_HUB: '/ai-hub',
    CONVERSATION: '/conversation/enhanced',
    ACADEMY: '/academy',
    GYM: '/gym',
    EDUCATION: '/education',
    GEMINI_WORKSPACE: '/gemini-workspace',

    // Operations
    ADMIN_DASHBOARD: '/admin',
    ROSTER: '/roster',
    VAULT: '/vault',
    PIVOT: '/pivot',
    LEDGER: '/ledger',
    SETTINGS: '/settings',

    // Creative
    TIFFANY_ED: '/tiffany-ed',
    STUDIO: '/studio',
    PUBLISHING: '/publishing',
    EXCURSIONS: '/excursions',

    // Wellness
    WELLNESS: '/wellness',
    GENERATORS: '/generators',

    // Commerce
    PRICING: '/pricing',
    PROFILE: '/profile',
    IDENTITY: '/profile',

    // Legal & Support
    PRIVACY: '/privacy',
    TERMS: '/terms',
    FERPA: '/ferpa',
    SUPPORT: '/support',
    CONTACT: '/contact',
} as const;
