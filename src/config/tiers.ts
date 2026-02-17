
// EdIntel Sovereign Tiers - Locked Configuration
// This is the single source of truth for all pricing and Stripe links.

export type EdIntelTier = {
    name: string;
    price: number;
    stripeLink: string;
    description: string;
    permissions: string[];
};

export const EDINTEL_TIERS: Record<string, EdIntelTier> = {
    "Site Command": {
        name: "Site Command",
        price: 79.99,
        stripeLink: "https://buy.stripe.com/7sY9AU7Lu8EDeabg0kdwc05",
        description: "Full site authority and collective intelligence protocols.",
        permissions: ["admin:all", "ai:sovereign", "vault:write", "gym:all", "studio:all"],
    },
    "Director Pack": {
        name: "Director Pack",
        price: 69.99,
        stripeLink: "https://buy.stripe.com/eVq3cwfdWf310jl01mdwc03",
        description: "Advanced executive leadership and oversight features.",
        permissions: ["admin:read", "ai:advanced", "vault:read", "roster:write"],
    },
    "Practitioner": {
        name: "Practitioner",
        price: 49.99,
        stripeLink: "https://buy.stripe.com/bJe6oI7Lu4onaXZ4hCdwc02",
        description: "Daily tactical protocols for established educators.",
        permissions: ["ai:standard", "gym:standard", "roster:write", "wellness:all"],
    },
    "Sovereign Pack": {
        name: "Sovereign Pack",
        price: 39.99,
        stripeLink: "https://buy.stripe.com/fZu00k7Lu0876HJ7tOdwc04",
        description: "Premium sovereign access for independent practitioners.",
        permissions: ["ai:advanced", "vault:personal", "gym:personal"],
    },
    "Standard Pack": {
        name: "Standard Pack",
        price: 9.99,
        stripeLink: "https://buy.stripe.com/7sY3cwfdWf317LN7tOdwc01",
        description: "Essential intelligence tools for the common educator.",
        permissions: ["ai:basic", "roster:read"],
    },
    "Sovereign Initiate": {
        name: "Sovereign Initiate",
        price: 0.00,
        stripeLink: "https://buy.stripe.com/aFa7sM3ve6wv9TVeWgdwc00",
        description: "The gateway to the EdIntel ecosystem. Entry-level access.",
        permissions: ["ai:trial"],
    },
};
