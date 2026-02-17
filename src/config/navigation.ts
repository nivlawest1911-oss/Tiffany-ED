/**
 * EdIntel Sovereign Suite Navigation Configuration
 * Single Source of Truth for Education & Wellness Modules
 */

import { EDINTEL_TIERS as TIERS_CONFIG } from '@/config/tiers';

export interface NavItem {
    label: string;
    href: string;
    icon: string;
    minTier: number; // Index of EDINTEL_TIERS (0-5)
    description?: string;
}

export const EDINTEL_TIERS = [
    { id: 'initiate', name: TIERS_CONFIG["Sovereign Initiate"].name, price: TIERS_CONFIG["Sovereign Initiate"].price, module: "General" },
    { id: 'standard', name: TIERS_CONFIG["Standard Pack"].name, price: TIERS_CONFIG["Standard Pack"].price, module: "EdIntel" },
    { id: 'sovereign', name: TIERS_CONFIG["Sovereign Pack"].name, price: TIERS_CONFIG["Sovereign Pack"].price, module: "EdIntel" },
    { id: 'practitioner', name: TIERS_CONFIG["Practitioner"].name, price: TIERS_CONFIG["Practitioner"].price, module: "Transcend" },
    { id: 'director', name: TIERS_CONFIG["Director Pack"].name, price: TIERS_CONFIG["Director Pack"].price, module: "Transcend" },
    { id: 'command', name: TIERS_CONFIG["Site Command"].name, price: TIERS_CONFIG["Site Command"].price, module: "Admin/District" }
];

export const NAV_LINKS = {
    education: [
        { label: "Sovereign Vault", href: "/vault", icon: "Shield", minTier: 2, description: "Sovereign Pack+ ($39.99/mo). Secure institutional data." },
        { label: "IEP Architect", href: "/generators", icon: "FileText", minTier: 1, description: "Standard Pack+ ($9.99/mo). Clinical-grade narratives." },
        { label: "Cognitive Gym", href: "/cognitive", icon: "Brain", minTier: 0, description: "Initiate Tier ($0). Interactive learning." },
        { label: "Gemini Workspace", href: "/gemini-workspace", icon: "Share2", minTier: 0, description: "Initiate Tier ($0). Sync your Gemini content." },
        { label: "Site Command", href: "/admin", icon: "Building", minTier: 5, description: "Site Command ($79.99/mo). District-wide analytics." },
    ],
    wellness: [
        { label: "Transcend Guide", href: "/ai-hub", icon: "Sparkles", minTier: 0, description: "Initiate Tier ($0). Wellness strategies." },
        { label: "Holistic Insights", href: "/professional", icon: "Activity", minTier: 3, description: "Practitioner+ ($49.99/mo). Mental clarity analytics." },
        { label: "Director Portal", href: "/the-room", icon: "Users", minTier: 4, description: "Director Pack ($69.99/mo). Executive wellness oversight." },
    ],
    account: [
        { label: "Command Center", href: "/settings", icon: "Settings", minTier: 0 },
        { label: "Access & Tiers", href: "/pricing", icon: "CreditCard", minTier: 0 },
    ]
};

export type AppRoute = typeof NAV_LINKS;
