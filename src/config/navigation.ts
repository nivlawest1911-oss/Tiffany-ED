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
        { label: "Intelligence Briefings", href: "/briefings", icon: "Radio", minTier: 0, description: "Strategic audio insights and regional data." },
        { label: "Lesson Planner", href: "/generator/lesson", icon: "BookOpen", minTier: 0, description: "Strategic instructional design." },
        { label: "IEP Architect", href: "/generator/iep", icon: "FileText", minTier: 0, description: "Special education protocol generation." },
        { label: "Cognitive Fitness", href: "/generator/cognitive", icon: "Brain", minTier: 0, description: "Burnout reduction & mental resilience." },
        { label: "Neural Grid Hub", href: "/ai-hub", icon: "Bot", minTier: 1, description: "Unified AI command center & protocols." },
        { label: "Conversation AI", href: "/conversation/enhanced", icon: "MessageSquare", minTier: 0, description: "Enhanced AI conversation interface." },
        { label: "Gemini Sync", href: "/gemini-workspace", icon: "Share2", minTier: 0, description: "Sync with your Gemini workspace." },
    ],
    operations: [
        { label: "The Room", href: "/the-room", icon: "LayoutDashboard", minTier: 0, description: "Executive operations center." },
        { label: "Site Command", href: "/admin", icon: "Shield", minTier: 5, description: "District-wide executive oversight." },
        { label: "Talent Command", href: "/ops/talent", icon: "Users", minTier: 4, description: "Bio-dynamic institutional pulse & staff well-being." },
        { label: "Decision Engine", href: "/generator/decision", icon: "Zap", minTier: 0, description: "AI-assisted strategic decision making." },
    ],
    creative: [
        { label: "Tiffany-Ed AI", href: "/tiffany-ed", icon: "Sparkles", minTier: 0, description: "Your AI digital twin companion." },
    ],
    wellness: [
    ],
    account: [
        { label: "Profile", href: "/profile", icon: "User", minTier: 0, description: "Your sovereign identity." },
        { label: "Settings", href: "/settings", icon: "Settings", minTier: 0 },
        { label: "Access & Tiers", href: "/pricing", icon: "CreditCard", minTier: 0 },
    ]
};

export type AppRoute = typeof NAV_LINKS;
