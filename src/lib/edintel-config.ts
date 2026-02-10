export const FOUNDER_BIO = {
    name: "Dr. Alvin West",
    role: "EdIntel Delegate & Chief Architect of EdIntel. Pioneer in educational AI, dedicated to transforming district intelligence through EdIntel neural protocols.",
    image: "/images/dr_alvin_west.png",
    credentials: ["PhD Education", "AI Governance", "Systemic Reform Architect"]
};

export const PRICING_TIERS = [
    {
        id: "basic",
        name: "Initiate Protocol",
        price: "$0",
        period: "/14 days",
        description: "Trial access to core EdIntel nodes for individual observers.",
        features: ["Onboarding Protocol", "Basic Neural Access", "District Identity Sync", "Security Baseline"],
        href: "/signup",
        buttonText: "Start Trial",
        badge: "Free Trial",
        highlight: false
    },
    {
        id: "EdIntel",
        name: "EdIntel Pack",
        price: "$39.99",
        period: "/mo",
        description: "High-fidelity AI tools designed for individual educator growth.",
        features: ["Advanced Node Logic", "Enhanced Dataset Link", "Priority Support", "Neural Memory Bank"],
        href: "/signup?plan=EdIntel",
        buttonText: "Level Up",
        badge: "Value",
        highlight: false
    },
    {
        id: "command",
        name: "Site Command",
        price: "$79.99",
        period: "/mo",
        description: "The ultimate orchestrator for building-wide leadership and staff authority.",
        features: ["Full Site Authority", "Max Neural Capacity", "Unlimited Usage Tokens*", "30-Day Master Trial"],
        href: "/signup?plan=command",
        buttonText: "Execute Command",
        badge: "Most Popular",
        highlight: true
    }
];

export const LEGAL_POLICIES = {
    ferpa: "EdIntel protocols are engineered for strict FERPA compliance. No student-identifiable data is processed on-device or at rest without district-sanctioned anonymization layers.",
    privacy: "Our privacy first initiative ensures that district datasets remain EdIntel. EdIntel agents do not train on private data, maintaining absolute data integrity and confidentiality."
};
