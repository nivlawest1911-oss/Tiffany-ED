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
        { label: "Intelligence Briefings", href: "/briefings", icon: "Radio", minTier: 0, description: "Strategic audio insights and regional data." },
        { label: "Lesson Planner", href: "/generator/lesson", icon: "BookOpen", minTier: 0, description: "Strategic instructional design." },
        { label: "IEP Architect", href: "/generator/iep", icon: "FileText", minTier: 0, description: "Special education protocol generation." },
        { label: "Cognitive Fitness", href: "/generator/cognitive", icon: "Brain", minTier: 0, description: "Burnout reduction & mental resilience." },
        { label: "Neural Grid Hub", href: "/ai-hub", icon: "Bot", minTier: 1, description: "Unified AI command center & protocols." },
        { label: "Conversation AI", href: "/conversation/enhanced", icon: "MessageSquare", minTier: 0, description: "Enhanced AI conversation interface." },
        { label: "Cognitive Academy", href: "/academy", icon: "GraduationCap", minTier: 0, description: "Regal pathways to mastery." },
        { label: "Cognitive Gym", href: "/gym", icon: "Dumbbell", minTier: 0, description: "Interactive mental fitness training." },
        { label: "Education Hub", href: "/education", icon: "Book", minTier: 0, description: "Core educational resources & modules." },
        { label: "Gemini Sync", href: "/gemini-workspace", icon: "Share2", minTier: 0, description: "Sync with your Gemini workspace." },
    ],
    operations: [
        { label: "Site Command", href: "/admin", icon: "LayoutDashboard", minTier: 5, description: "District-wide executive oversight." },
        { label: "Command Center", href: "/ops/command", icon: "Shield", minTier: 5, description: "Strategic 'God-mode' district oversight." },
        { label: "Talent Command", href: "/ops/talent", icon: "Users", minTier: 4, description: "Bio-dynamic institutional pulse & staff well-being." },
        { label: "Decision Engine", href: "/generator/decision", icon: "Zap", minTier: 0, description: "AI-assisted strategic decision making." },
        { label: "Roster Logistics", href: "/roster", icon: "ClipboardList", minTier: 3, description: "Staff & student roster management." },
        { label: "Sovereign Vault", href: "/vault", icon: "Shield", minTier: 2, description: "Secure institutional data vault." },
        { label: "Pivot Dashboard", href: "/pivot", icon: "BarChart3", minTier: 2, description: "Strategic data pivot & analytics." },
        { label: "Professional Insights", href: "/ledger", icon: "Activity", minTier: 3, description: "Mental health & burnout analytics." },
    ],
    creative: [
        { label: "Tiffany-Ed AI", href: "/tiffany-ed", icon: "Sparkles", minTier: 0, description: "Your AI digital twin companion." },
        { label: "Creative Studio", href: "/studio", icon: "Palette", minTier: 0, description: "Design & media creation tools." },
        { label: "Publishing", href: "/publishing", icon: "FileText", minTier: 1, description: "Content publishing & distribution." },
        { label: "Excursions", href: "/excursions", icon: "Map", minTier: 0, description: "Field trip planning & logistics." },
    ],
    wellness: [
        { label: "Wellness Hub", href: "/wellness", icon: "Heart", minTier: 0, description: "Central emotional intelligence center." },
        { label: "Wellness Generators", href: "/generators?category=Wellness", icon: "Sparkles", minTier: 0, description: "AI-powered wellness strategies." },
    ],
    account: [
        { label: "Profile", href: "/profile", icon: "User", minTier: 0, description: "Your sovereign identity." },
        { label: "Settings", href: "/settings", icon: "Settings", minTier: 0 },
        { label: "Access & Tiers", href: "/pricing", icon: "CreditCard", minTier: 0 },
    ]
};

export type AppRoute = typeof NAV_LINKS;
