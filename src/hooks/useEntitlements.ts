'use client';

import useSWR from 'swr';

export type EntitlementsPayload = {
  tierId: string;
  rank: number;
  source: string;
  warning?: string | null;
  tierMissing?: boolean;
  tierUnknown?: boolean;
  subscriptionStatus?: string | null;
  stripeCustomerId?: string | null;
  features: Record<string, boolean>;
  isAdmin?: boolean;
  code?: string;
};

const fetcher = async (url: string): Promise<EntitlementsPayload> => {
  const res = await fetch(url, {
    credentials: 'include',
    cache: 'no-store',
  });
  if (res.status === 401) {
    throw new Error('UNAUTHENTICATED');
  }
  if (!res.ok) {
    throw new Error(`Entitlements ${res.status}`);
  }
  return res.json();
};

/**
 * Single source for paywalls / feature gates on the client.
 * Dedupes concurrent callers; revalidates every 60s in the background.
 */
export function useEntitlements(enabled = true) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    EntitlementsPayload
  >(enabled ? '/api/entitlements' : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60_000,
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  return {
    entitlements: data,
    tierId: data?.tierId ?? 'sovereign-initiate',
    rank: data?.rank ?? 0,
    features: data?.features ?? {},
    warning: data?.warning ?? null,
    isAdmin: Boolean(data?.isAdmin),
    isLoading,
    isValidating,
    error,
    refresh: mutate,
    can: (feature: string) => Boolean(data?.features?.[feature]),
  };
}
