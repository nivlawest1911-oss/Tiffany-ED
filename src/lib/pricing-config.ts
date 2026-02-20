import { EDINTEL_TIERS } from '@/config/tiers';

export const EdIntel_TIERS = [
    {
        id: 'sovereign-initiate',
        ...EDINTEL_TIERS["Sovereign Initiate"],
        icon: "Sparkles",
        color: "zinc",
        idealFor: "Observers & New Users",
        features: ["Onboarding Protocol", "Basic Neural Access", "District Identity Sync", "14-Day Lead Capture"],
        popular: false,
        badge: 'FREE',
        trialDuration: '14 Days',
        robust: false,
        tokenAllocation: 500
    },
    {
        id: 'standard-pack',
        ...EDINTEL_TIERS["Standard Pack"],
        icon: "Star",
        color: "violet",
        idealFor: "Individual Teachers",
        features: ["Baseline Intelligence", "Standard Node Support", "Usage Analytics", "Full 30-Day Protocol"],
        popular: false,
        badge: 'BASIC',
        trialDuration: '30 Days',
        robust: false
    },
    {
        id: 'EdIntel-pack',
        ...EDINTEL_TIERS["Sovereign Pack"],
        icon: "Crown",
        color: "amber",
        idealFor: "Detailed Educators",
        features: ["Advanced Node Logic", "Enhanced Dataset Link", "Priority Support", "30-Day EdIntel Trial"],
        popular: false,
        badge: 'VALUE',
        trialDuration: '30 Days',
        robust: false
    },
    {
        id: 'practitioner',
        ...EDINTEL_TIERS["Practitioner"],
        icon: "GraduationCap",
        color: "emerald",
        idealFor: "Classroom Specialists",
        features: ["Pro Architect Tools", "Multi-Node Management", "Custom Protocol Loads", "30-Day Pro Trial"],
        popular: false,
        badge: 'POPULAR',
        trialDuration: '30 Days',
        robust: false
    },
    {
        id: 'director-pack',
        ...EDINTEL_TIERS["Director Pack"],
        icon: "Briefcase",
        color: "blue",
        idealFor: "Department Heads",
        features: ["Leadership Oversight", "Admin Dashboard", "District-Wide Reporting", "30-Day Director Trial"],
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
        idealFor: "Principals & Admin",
        features: ["Full Site Authority", "Max Neural Capacity", "Unlimited Usage Tokens*", "30-Day Command Trial"],
        popular: true,
        badge: 'COMMAND',
        trialDuration: '30 Days',
        robust: true, // Featured
        tokenAllocation: 999999999 // Unlimited
    }
];

export const PRICING_CONSTANTS = {
    TRIAL_DAYS_INITIATE: 14,
    TRIAL_DAYS_STANDARD: 30,
    CURRENCY: "USD",
    PROTOCOL_VERSION: "v5.4",
    ROI_COEFFICIENT: 0.22,
};
