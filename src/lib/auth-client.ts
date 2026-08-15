import { createAuthClient } from "better-auth/react";

/**
 * Client-side baseURL is fully env-driven.
 * Priority: NEXT_PUBLIC_BETTER_AUTH_URL → window.location.origin (runtime) → empty (lets better-auth use relative)
 * Never hardcode a production domain here.
 */
const clientBaseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  (typeof window !== "undefined" ? window.location.origin : undefined);

export const authClient = createAuthClient({
  baseURL: clientBaseURL,
});

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession 
} = authClient;
