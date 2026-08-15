import { EdIntel_TIERS } from './pricing-config';

export enum EdIntelFeature {
  BASIC_GENERATOR = 'basic_generator',
  ADVANCED_GENERATOR = 'advanced_generator',
  VIDEO_STUDIO = 'video_studio',
  DISTRICT_ANALYTICS = 'district_analytics',
  UNLIMITED_TOKENS = 'unlimited_tokens',
  BLOB_DISTRICT = 'blob_district',
  BLOB_ADMIN = 'blob_admin',
  ANTIGRAVITY = 'antigravity',
}

/** Tier ids must match rbac-stripe + blob-acl */
const FEATURE_ACCESS: Record<string, string[]> = {
  [EdIntelFeature.BASIC_GENERATOR]: [
    'sovereign-initiate',
    'standard-pack',
    'sovereign-pack',
    'practitioner',
    'director-pack',
    'site-command',
  ],
  [EdIntelFeature.ADVANCED_GENERATOR]: [
    'sovereign-pack',
    'practitioner',
    'director-pack',
    'site-command',
  ],
  [EdIntelFeature.VIDEO_STUDIO]: [
    'practitioner',
    'director-pack',
    'site-command',
  ],
  [EdIntelFeature.DISTRICT_ANALYTICS]: ['director-pack', 'site-command'],
  [EdIntelFeature.UNLIMITED_TOKENS]: ['site-command'],
  [EdIntelFeature.BLOB_DISTRICT]: ['director-pack', 'site-command'],
  [EdIntelFeature.BLOB_ADMIN]: ['site-command'],
  [EdIntelFeature.ANTIGRAVITY]: [
    'practitioner',
    'director-pack',
    'site-command',
  ],
};

function normalize(tier: string): string {
  return tier.toLowerCase().replace(/\s+/g, '-');
}

export function checkAccess(
  userTier: string | undefined,
  feature: EdIntelFeature
): boolean {
  if (!userTier) return false;
  const allowed = FEATURE_ACCESS[feature] || [];
  const id = normalize(userTier);
  if (allowed.includes(id)) return true;
  // legacy name forms
  if (id.includes('site-command') && allowed.includes('site-command')) return true;
  if (id.includes('director') && allowed.includes('director-pack')) return true;
  if (id.includes('practitioner') && allowed.includes('practitioner')) return true;
  return false;
}

export function getUpgradeLink(targetTierId: string): string {
  const tier = EdIntel_TIERS.find((t) => t.id === targetTierId);
  return (tier as any)?.stripeLink || '/pricing';
}
