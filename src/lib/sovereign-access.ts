import { EdIntel_TIERS } from './pricing-config';

export enum EdIntelFeature {
    BASIC_GENERATOR = 'basic_generator',
    ADVANCED_GENERATOR = 'advanced_generator',
    VIDEO_STUDIO = 'video_studio',
    DISTRICT_ANALYTICS = 'district_analytics',
    UNLIMITED_TOKENS = 'unlimited_tokens'
}

const FEATURE_ACCESS: Record<string, string[]> = {
    [EdIntelFeature.BASIC_GENERATOR]: ['EdIntel-initiate', 'standard-pack', 'EdIntel-pack', 'practitioner', 'director-pack', 'site-command'],
    [EdIntelFeature.ADVANCED_GENERATOR]: ['EdIntel-pack', 'practitioner', 'director-pack', 'site-command'],
    [EdIntelFeature.VIDEO_STUDIO]: ['practitioner', 'director-pack', 'site-command'],
    [EdIntelFeature.DISTRICT_ANALYTICS]: ['director-pack', 'site-command'],
    [EdIntelFeature.UNLIMITED_TOKENS]: ['site-command']
};

export function checkAccess(userTier: string | undefined, feature: EdIntelFeature): boolean {
    if (!userTier) return false;

    // Normalize tier string (handle potential case differences or legacy data)
    const normalizedTier = userTier.toLowerCase().replace(/\s+/g, '-');

    // Direct ID match from config
    const allowedTiers = FEATURE_ACCESS[feature];
    if (allowedTiers.includes(userTier)) return true;

    // Fallback: Check strictly by ID if the userTier passed is actually a name
    // (Optimization: map names to IDs if needed, but for now we assume ID usage in DB)

    return false;
}

export function getUpgradeLink(targetTierId: string): string {
    const tier = EdIntel_TIERS.find(t => t.id === targetTierId);
    return tier?.stripeLink || '#';
}
