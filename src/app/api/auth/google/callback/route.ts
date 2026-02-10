import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { UserService } from '@/lib/services/user-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const domain = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const REDIRECT_URI = `${domain}/api/auth/google/callback`;

    // Handle OAuth errors
    if (error) {
        console.error(`[GOOGLE AUTH] OAuth error: ${error}`);
        return NextResponse.redirect(new URL(`/login?error=oauth_${error}`, request.url));
    }

    if (!code) {
        console.error('[GOOGLE AUTH] No authorization code received');
        return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        console.error('[GOOGLE AUTH] Missing OAuth credentials');
        return NextResponse.redirect(new URL('/login?error=config_error', request.url));
    }

    try {
        // 1. Exchange Code for Token with retry logic
        let tokenData: any;
        let retries = 3;

        while (retries > 0) {
            try {
                const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        code,
                        client_id: GOOGLE_CLIENT_ID,
                        client_secret: GOOGLE_CLIENT_SECRET,
                        redirect_uri: REDIRECT_URI,
                        grant_type: 'authorization_code',
                    }),
                });

                tokenData = await tokenResponse.json();

                if (!tokenResponse.ok) {
                    throw new Error(tokenData.error_description || 'Token exchange failed');
                }

                break; // Success
            } catch (err) {
                retries--;
                if (retries === 0) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
            }
        }

        // 2. Get User Profile
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const googleUser = await userResponse.json();
        const { email, name, picture, id: googleId } = googleUser;

        console.log(`[GOOGLE AUTH] User authenticated: ${email}`);

        // 3. Sync User & Initialize Tokens (UNIFIED SERVICE)
        // We use the Google ID as the user ID for this custom flow, or generate one if strictly DB-based.
        // However, if we want to integrate with Supabase Auth later, this custom flow is separate.
        // For consistency with the unified UserService which expects a UUID if possible, we should ideally use a UUID.
        // But the previous code used `crypto.randomUUID()` for new users.
        // UserService.syncUser handles lookup by email.
        // We need to pass a valid ID if we want to force one, or let it find/create.
        // The previous logic generated a UUID. UserService expects an ID to be passed for creation.

        // We'll generate a UUID to be safe, but UserService will ignore it if user exists by email.
        const potentialId = crypto.randomUUID();

        const user = await UserService.syncUser(
            potentialId,
            email,
            name,
            picture,
            googleId
        );

        console.log(`[EdIntel SYNC] User synced: ${user.email} (${user.tier})`);

        // 4. Create Secure Session (Legacy/Custom JWT)
        await login({
            id: user.id, // This comes from DB sync
            email: user.email,
            name: name,
            tier: user.tier
        });

        console.log(`[SESSION] Created for ${email}`);

        // 5. Redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard?login=success', request.url));

    } catch (error: any) {
        console.error('[GOOGLE AUTH] Callback error:', error);
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }
}

