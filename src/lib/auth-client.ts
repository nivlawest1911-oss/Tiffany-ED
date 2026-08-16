import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

/**
 * Client-side baseURL is fully env-driven.
 * Priority: NEXT_PUBLIC_BETTER_AUTH_URL → window.location.origin
 */
const clientBaseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  (typeof window !== "undefined" ? window.location.origin : undefined);

export const authClient = createAuthClient({
  baseURL: clientBaseURL,
  plugins: [
    (customSessionClient as any)(),
    (inferAdditionalFields as any)(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
