import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    // Neuronal UI Handshake Configuration
    // The client will automatically detect the base URL from the environment
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
});

export const { signIn, signUp, useSession, signOut } = authClient;
