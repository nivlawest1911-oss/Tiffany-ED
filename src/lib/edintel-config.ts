export const BRAND_CONFIG = {
    name: "EdIntel",
    tagline: "Intelligence in Education",
    logo: "/images/edintel-logo.png",
    shieldIcon: "/images/edintel-logo.png",
    primaryColor: "#D4AF37", // Gold Shield Accent
    context: "Alabama K-12 / Mobile County Public Schools sovereign AI orchestration",
};

export const FOUNDER_BIO = {
    name: "EdIntel Founders Foundry",
    role: "Institutional AI Orchestrator & Autonomous Pedagogical Engine for Mobile County and Alabama K-12.",
    image: "/images/edintel-logo.png",
    credentials: ["ALCOS Pedagogy", "FERPA Shield", "Alabama Admin Code Part 2 Compliant"]
};

import { EdIntel_TIERS } from './pricing-config';

export const PRICING_TIERS = EdIntel_TIERS.map(tier => ({
    id: tier.id,
    name: tier.name,
    price: tier.price === 0 ? "$0" : `$${tier.price}`,
    period: "/mo",
    description: tier.description,
    features: tier.features,
    href: "/signup",
    buttonText: tier.price === 0 ? "Start Trial" : "Ascend to Command",
    badge: tier.badge,
    highlight: tier.popular
}));

export const LEGAL_POLICIES = {
    ferpa: "EdIntel protocols are engineered for strict FERPA compliance. No student-identifiable data is processed without district-sanctioned anonymization layers.",
    privacy: "Our privacy-first initiative ensures that district datasets remain sovereign. EdIntel agents do not train on private student data, maintaining absolute data integrity and confidentiality."
};
