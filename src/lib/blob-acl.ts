/**
 * Fine-grained access control for Vercel Blob pathnames.
 * Combines path prefix policies, subscription tier, and ownership.
 */

export type BlobOperation = 'get' | 'head' | 'put' | 'delete';

export type BlobPrincipal = {
  userId: string;
  email?: string | null;
  /** better-auth / subscription tier id, e.g. site-command, director-pack */
  tier?: string | null;
  district?: string | null;
  schoolSite?: string | null;
  position?: string | null;
  /** Explicit admin override (env or DB flag) */
  isAdmin?: boolean;
};

export type AclDecision =
  | { allowed: true; policy: string }
  | { allowed: false; reason: string; code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'TIER' | 'OWNERSHIP' | 'INVALID_PATH' };

/** Tier rank — higher unlocks broader path classes */
const TIER_RANK: Record<string, number> = {
  'sovereign-initiate': 0,
  'edintel-initiate': 0,
  'standard-pack': 1,
  'sovereign-pack': 2,
  'edintel-pack': 2,
  practitioner: 3,
  'director-pack': 4,
  'site-command': 5,
};

function normalizeTier(tier?: string | null): string {
  if (!tier) return 'sovereign-initiate';
  return tier.toLowerCase().replace(/\s+/g, '-');
}

export function tierRank(tier?: string | null): number {
  const id = normalizeTier(tier);
  if (TIER_RANK[id] !== undefined) return TIER_RANK[id];
  // Friendly names from Antigravity bridge
  if (/site.?command/i.test(tier || '')) return 5;
  if (/director/i.test(tier || '')) return 4;
  if (/practitioner/i.test(tier || '')) return 3;
  return 0;
}

export function sanitizeAclPath(pathname: string): string {
  const cleaned = pathname
    .replace(/^\/+/, '')
    .replace(/\\/g, '/')
    .split('/')
    .filter((s) => s && s !== '.' && s !== '..')
    .join('/');
  if (!cleaned) throw new Error('INVALID_PATH');
  return cleaned;
}

type PathPolicy = {
  id: string;
  /** pathname starts with this prefix (after sanitize) */
  prefix: string;
  minTier: number;
  /** If true, second segment must equal userId (users/{userId}/...) */
  requireOwner?: boolean;
  /** If true, path must include district slug matching principal.district */
  requireDistrict?: boolean;
  ops: BlobOperation[];
  /** Admin / ALLOW_ADMIN_BLOB only */
  adminOnly?: boolean;
};

/**
 * Ordered policies — first match wins.
 * Layout:
 *   public-media/...          marketing / brand (authenticated read; high tier write)
 *   users/{userId}/...        personal vault
 *   district/{districtId}/... shared district assets
 *   exports/{userId}/...      generated reports
 *   admin/...                 platform ops only
 */
const POLICIES: PathPolicy[] = [
  {
    id: 'admin',
    prefix: 'admin/',
    minTier: 5,
    adminOnly: true,
    ops: ['get', 'head', 'put', 'delete'],
  },
  {
    id: 'exports',
    prefix: 'exports/',
    minTier: 2,
    requireOwner: true, // exports/{userId}/...
    ops: ['get', 'head', 'put'],
  },
  {
    id: 'district',
    prefix: 'district/',
    minTier: 4, // director-pack+
    requireDistrict: true,
    ops: ['get', 'head', 'put'],
  },
  {
    id: 'users',
    prefix: 'users/',
    minTier: 1,
    requireOwner: true,
    ops: ['get', 'head', 'put', 'delete'],
  },
  {
    id: 'public-media',
    prefix: 'public-media/',
    minTier: 0,
    ops: ['get', 'head'], // writes: site-command only via separate check below
  },
];

function matchPolicy(path: string): PathPolicy | null {
  for (const p of POLICIES) {
    if (path === p.prefix.slice(0, -1) || path.startsWith(p.prefix)) return p;
  }
  return null;
}

function ownerFromPath(path: string, prefix: string): string | null {
  // users/{userId}/... or exports/{userId}/...
  const rest = path.slice(prefix.length);
  const owner = rest.split('/')[0];
  return owner || null;
}

function districtFromPath(path: string): string | null {
  // district/{districtId}/...
  const rest = path.slice('district/'.length);
  const d = rest.split('/')[0];
  return d || null;
}

/**
 * Core ACL check for a principal + pathname + operation.
 */
export function assertBlobAccess(
  principal: BlobPrincipal | null | undefined,
  pathname: string,
  operation: BlobOperation
): AclDecision {
  if (!principal?.userId) {
    return { allowed: false, reason: 'Sign in required', code: 'UNAUTHENTICATED' };
  }

  let path: string;
  try {
    path = sanitizeAclPath(pathname);
  } catch {
    return { allowed: false, reason: 'Invalid pathname', code: 'INVALID_PATH' };
  }

  const policy = matchPolicy(path);
  if (!policy) {
    return {
      allowed: false,
      reason: 'Path not under an allowed prefix (users/, exports/, district/, public-media/, admin/)',
      code: 'FORBIDDEN',
    };
  }

  if (policy.adminOnly) {
    const adminOk =
      principal.isAdmin === true || process.env.ALLOW_ADMIN_BLOB === '1';
    if (!adminOk) {
      return { allowed: false, reason: 'Admin path restricted', code: 'FORBIDDEN' };
    }
  }

  // public-media writes require site-command
  if (policy.id === 'public-media' && (operation === 'put' || operation === 'delete')) {
    if (tierRank(principal.tier) < 5 && !principal.isAdmin) {
      return {
        allowed: false,
        reason: 'Writing public-media requires Site Command',
        code: 'TIER',
      };
    }
  } else if (!policy.ops.includes(operation)) {
    return {
      allowed: false,
      reason: `Operation ${operation} not allowed on ${policy.id}`,
      code: 'FORBIDDEN',
    };
  }

  if (tierRank(principal.tier) < policy.minTier && !principal.isAdmin) {
    return {
      allowed: false,
      reason: `Tier too low for ${policy.id} (need rank >= ${policy.minTier})`,
      code: 'TIER',
    };
  }

  if (policy.requireOwner) {
    const owner = ownerFromPath(path, policy.prefix);
    if (!owner || owner !== principal.userId) {
      // Directors+ may read district-scoped exports of others only under district/ policy — not here
      if (!(principal.isAdmin || process.env.ALLOW_ADMIN_BLOB === '1')) {
        return {
          allowed: false,
          reason: 'You can only access your own folder under this prefix',
          code: 'OWNERSHIP',
        };
      }
    }
  }

  if (policy.requireDistrict) {
    const pathDistrict = districtFromPath(path);
    const userDistrict = (principal.district || '')
      .toLowerCase()
      .replace(/\s+/g, '-');
    if (
      !pathDistrict ||
      !userDistrict ||
      pathDistrict.toLowerCase() !== userDistrict
    ) {
      if (!principal.isAdmin && process.env.ALLOW_ADMIN_BLOB !== '1') {
        return {
          allowed: false,
          reason: 'District path does not match your district profile',
          code: 'OWNERSHIP',
        };
      }
    }
  }

  return { allowed: true, policy: policy.id };
}

/** Build a safe user vault key */
export function userVaultPath(userId: string, ...parts: string[]): string {
  return sanitizeAclPath(['users', userId, ...parts].join('/'));
}

export function exportPath(userId: string, ...parts: string[]): string {
  return sanitizeAclPath(['exports', userId, ...parts].join('/'));
}

export function districtPath(districtId: string, ...parts: string[]): string {
  return sanitizeAclPath(
    ['district', districtId.toLowerCase().replace(/\s+/g, '-'), ...parts].join('/'
  ));
}
