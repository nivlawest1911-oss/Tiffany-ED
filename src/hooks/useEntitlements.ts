'use client';

import useSWR from 'swr';

export type EntitlementsPayload = {
  userId?: string;
  email?: string;
  tier?: string;
  tierId?: string;
  rank: number;
  source?: string;
  warning?: string | null;
  tierMissing?: boolean;
  tierWarning?: string | null;
  entitlement?: any;
  subscriptionStatus?: string | null;
  stripeCustomerId?: string | null;
  features?: Record<string, boolean>;
  isAdmin?: boolean;
  code?: string;
};

const fetcher = async (url: string): Promise<EntitlementsPayload> => {
  const res = await fetch(url, {
    credentials: 'include',
    cache: 'no-store',
  });
  if (res.status === 401) {
    return res.json();
  }
  if (!res.ok) {
    throw new Error(`Entitlements ${res.status}`);
  }
  return res.json();
};

export function useEntitlements(enabled = true) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<EntitlementsPayload>(
    enabled ? '/api/entitlements' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60_000,
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  return {
    entitlements: data?.entitlement || data,
    tier: data?.tier || 'Initiate',
    tierId: data?.tierId || 'sovereign-initiate',
    rank: data?.rank ?? 1,
    tierMissing: Boolean(data?.tierMissing),
    tierWarning: data?.tierWarning || data?.warning || null,
    features: data?.features ?? {},
    warning: data?.warning ?? null,
    isAdmin: Boolean(data?.isAdmin),
    isLoading,
    isValidating,
    isError: Boolean(error),
    error,
    mutate,
    refresh: mutate,
    can: (feature: string) => Boolean(data?.features?.[feature]),
  };
}
