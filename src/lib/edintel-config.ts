export const FOUNDER_BIO = {
    name: "Dr. Alvin West",
    role: "EdIntel Delegate & Chief Architect of EdIntel. Pioneer in educational AI, dedicated to transforming district intelligence through EdIntel neural protocols.",
    image: "/images/dr_alvin_west.png",
    credentials: ["PhD Education", "AI Governance", "Systemic Reform Architect"]
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
    ferpa: "EdIntel protocols are engineered for strict FERPA compliance. No student-identifiable data is processed on-device or at rest without district-sanctioned anonymization layers.",
    privacy: "Our privacy first initiative ensures that district datasets remain EdIntel. EdIntel agents do not train on private data, maintaining absolute data integrity and confidentiality."
};
