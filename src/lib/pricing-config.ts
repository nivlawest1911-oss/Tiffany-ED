import { EDINTEL_TIERS } from '@/config/tiers';

export const EdIntel_TIERS = [
    {
        id: 'sovereign-initiate',
        ...EDINTEL_TIERS["Sovereign Initiate"],
        icon: "Sparkles",
        color: "zinc",
        idealFor: "Exploring Educators",
        features: [
            "Access to the EdIntel platform & onboarding protocol",
            "5 AI generation requests per day (Chat & Generators)",
            "Public Sovereign Broadcast episodes (Podcast)",
            "Basic Cognitive Academy preview lessons",
            "District Identity Sync (profile setup)",
            "Community-level support access",
        ],
        popular: false,
        badge: 'FREE',
        trialDuration: '0 Days',
        robust: false,
        tokenAllocation: 500
    },
    {
        id: 'standard-pack',
        ...EDINTEL_TIERS["Standard Pack"],
        icon: "Star",
        color: "violet",
        idealFor: "Individual Teachers",
        features: [
            "50 AI generations/day across all generators",
            "IEP Architect, Lesson Planner & Data Quant agents",
            "Full Cognitive Academy curriculum library",
            "AI Conversation (Enhanced) — unlimited sessions",
            "Downloadable AI outputs (PDF/Copy)",
            "Email support with 48-hr response SLA",
        ],
        popular: false,
        badge: 'BASIC',
        trialDuration: '30 Days',
        robust: false,
        tokenAllocation: 1500
    },
    {
        id: 'sovereign-pack',
        ...EDINTEL_TIERS["Sovereign Pack"],
        icon: "Crown",
        color: "amber",
        idealFor: "Power Educators",
        features: [
            "Unlimited AI generations across all 70+ agents",
            "Neural Coach, Policy Advisor & Compliance Auditor unlocked",
            "Personal Sovereign Vault (secure, encrypted doc storage)",
            "Cognitive Gym — full suite of 15+ mental fitness modules",
            "Priority AI routing — faster response times",
            "Chat support with 24-hr response SLA",
        ],
        popular: false,
        badge: 'VALUE',
        trialDuration: '30 Days',
        robust: false,
        tokenAllocation: 5000
    },
    {
        id: 'practitioner',
        ...EDINTEL_TIERS["Practitioner"],
        icon: "GraduationCap",
        color: "emerald",
        idealFor: "Instructional Specialists",
        features: [
            "Everything in Sovereign Pack, plus:",
            "Fiscal Strategist & Grant Compliance Auditor agents",
            "Roster Logistics — full staff & student caseload tools",
            "Wellness Hub with burnout analytics & self-care plans",
            "Professional Ledger — CEU/PLU activity tracker",
            "Dedicated account manager & priority support",
        ],
        popular: false,
        badge: 'POPULAR',
        trialDuration: '30 Days',
        robust: false,
        tokenAllocation: 10000
    },
    {
        id: 'director-pack',
        ...EDINTEL_TIERS["Director Pack"],
        icon: "Briefcase",
        color: "blue",
        idealFor: "Department Heads & APs",
        features: [
            "Everything in Practitioner, plus:",
            "Admin Dashboard — district-wide KPI reporting & ROI metrics",
            "Staff Retention Prophet & HR Talent Scout agents",
            "Instructional Walkthrough tools (AMSTI, ARI-aligned)",
            "Sovereign Vault team sharing (up to 10 members)",
            "Advanced analytics exports (CSV, PDF reports)",
        ],
        popular: false,
        badge: 'LEADERSHIP',
        trialDuration: '30 Days',
        robust: true,
        tokenAllocation: 20000
    },
    {
        id: 'site-command',
        ...EDINTEL_TIERS["Site Command"],
        icon: "Building",
        color: "rose",
        idealFor: "Principals & School Administrators",
        features: [
            "Everything in Director Pack, plus:",
            "Full Site Command — school-wide AI deployment for all staff",
            "Unlimited Vault storage & shared collaborative workspaces",
            "Crisis Ops Lead, Safety Drill Master & Facilities Manager agents",
            "Direct API access for custom integrations (AIM, eGAP)",
            "White-glove onboarding, dedicated success manager & SLA guarantee",
        ],
        popular: true,
        badge: 'COMMAND',
        trialDuration: '30 Days',
        robust: true,
        tokenAllocation: 999999999
    }
];

export const PRICING_CONSTANTS = {
    TRIAL_DAYS_INITIATE: 0,
    TRIAL_DAYS_STANDARD: 30,
    CURRENCY: "USD",
    PROTOCOL_VERSION: "v5.4",
    ROI_COEFFICIENT: 0.22,
};
