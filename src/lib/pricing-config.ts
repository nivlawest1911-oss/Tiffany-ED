export const SOVEREIGN_TIERS = [
    {
        id: 'site-command',
        name: "Site Command",
        price: 79.99,
        monthlyPrice: 79.99,
        stripeLink: "https://buy.stripe.com/7sY9AU7Lu8EDeabg0kdwc05",
        icon: "Building",
        color: "rose",
        idealFor: "Principals & Admin",
        description: "Building-wide orchestration and staff management.",
        features: ["Staff Management", "ROI Reporting", "Dedicated Manager", "Custom Training", "District Integration Ready"],
        popular: false,
        badge: 'ADMIN'
    },
    {
        id: 'director-pack',
        name: "Director Pack",
        price: 69.99,
        monthlyPrice: 69.99,
        stripeLink: "https://buy.stripe.com/eVq3cwfdWf310jl01mdwc03",
        icon: "Briefcase",
        color: "blue",
        idealFor: "Department Heads",
        description: "Team-wide intelligence and strategic management.",
        features: ["Leadership Suite", "Team Analytics", "Staff Sentiment", "Compliance Audit", "Executive Protocol Generator"],
        popular: false,
        badge: 'LEADERSHIP'
    },
    {
        id: 'practitioner',
        name: "Practitioner",
        price: 49.99,
        monthlyPrice: 49.99,
        stripeLink: "https://buy.stripe.com/bJe6oI7Lu4onaXZ4hCdwc02",
        icon: "GraduationCap",
        color: "emerald",
        idealFor: "Classroom Specialists",
        description: "Full leadership suite for the classroom.",
        features: ["IEP Architect", "Lesson Plan Pro", "Policy Advisor", "PD Hub", "Priority Support"],
        popular: true,
        badge: 'POPULAR'
    },
    {
        id: 'sovereign-pack',
        name: "Sovereign Pack",
        price: 39.99,
        monthlyPrice: 39.99,
        stripeLink: "https://buy.stripe.com/fZu00k7Lu0876HJ7tOdwc04",
        icon: "Crown",
        color: "amber",
        idealFor: "Detailed Educators",
        description: "High-fidelity AI tools for individual growth.",
        features: ["Unlimited AI", "Full Legal Vault", "Burnout Shield", "Cognitive Coach", "Alabama Resource Library"],
        popular: false,
        badge: 'VALUE'
    },
    {
        id: 'standard-pack',
        name: "Standard Pack",
        price: 9.99,
        monthlyPrice: 9.99,
        stripeLink: "https://buy.stripe.com/7sY3cwfdWf317LN7tOdwc01",
        icon: "Star",
        color: "violet",
        idealFor: "Individual Teachers",
        description: "Essential productivity toolkit for educators.",
        features: ["25 AI Queries", "IEP Templates", "Email Generator", "Mobile App Access", "Community Support"],
        popular: false,
        badge: 'BASIC'
    },
    {
        id: 'sovereign-initiate',
        name: "Sovereign Initiate",
        price: 0,
        monthlyPrice: 0,
        stripeLink: "",
        icon: "Sparkles",
        color: "zinc",
        idealFor: "Observers & New Users",
        description: "Initial access to Sovereign protocols.",
        features: ["Basic Dashboard", "Community Resources", "5 AI Queries", "Legal Preview", "Email Support"],
        popular: false,
        badge: 'FREE'
    }
];

export const PRICING_CONSTANTS = {
    TRIAL_DAYS: 30,
    CURRENCY: "USD",
    PROTOCOL_VERSION: "v5.1",
    ROI_COEFFICIENT: 0.22,
};
