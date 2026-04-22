import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Neuronal UI Handshake Configuration
    // The client will automatically detect the base URL from the environment
});

export const { signIn, signUp, useSession, signOut } = authClient;
