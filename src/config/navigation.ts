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
        { label: "Sovereign Room", href: "/the-room", icon: "Crown", minTier: 1, description: "Sovereign educator command center." },
        { label: "Sovereign Vault", href: "/vault", icon: "Shield", minTier: 2, description: "Secure institutional data vault." },
        { label: "Neural Grid Hub", href: "/ai-hub", icon: "Bot", minTier: 1, description: "Unified AI command center & protocols." },
        { label: "Cognitive Academy", href: "/academy", icon: "GraduationCap", minTier: 0, description: "Regal pathways to mastery." },
        { label: "Cognitive Gym", href: "/gym", icon: "Dumbbell", minTier: 0, description: "Interactive mental fitness training." },
        { label: "Gemini Sync", href: "/gemini-workspace", icon: "Share2", minTier: 0, description: "Sync with your Gemini workspace." },
        { label: "Site Command", href: "/admin", icon: "LayoutDashboard", minTier: 5, description: "District-wide executive oversight." },
    ],
    wellness: [
        { label: "Wellness Hub", href: "/wellness", icon: "Heart", minTier: 0, description: "Central emotional intelligence center." },
        { label: "Sovereign Pulse", href: "/generators?category=Wellness", icon: "Sparkles", minTier: 0, description: "AI-powered wellness strategies." },
        { label: "Professional Insights", href: "/ledger", icon: "Activity", minTier: 3, description: "Mental health & burnout analytics." },
        { label: "Sovereign Room", href: "/the-room", icon: "Users", minTier: 4, description: "Executive leadership command center." },
    ],
    account: [
        { label: "Command Center", href: "/settings", icon: "Settings", minTier: 0 },
        { label: "Access & Tiers", href: "/pricing", icon: "CreditCard", minTier: 0 },
    ]
};

export type AppRoute = typeof NAV_LINKS;
