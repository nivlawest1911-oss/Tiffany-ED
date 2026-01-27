import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

    // Attempt to get domain from request if NEXT_PUBLIC_APP_URL is missing
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    // Force Vercel URL if not localhost to fix Redirect Mismatch
    let domain = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    if (!domain.includes('localhost') && !process.env.NEXT_PUBLIC_APP_URL) {
        domain = 'https://edintel-app.vercel.app';
    }

    const REDIRECT_URI = `${domain}/api/auth/google/callback`;
    console.log('[Auth] Using Redirect URI:', REDIRECT_URI);

    if (!GOOGLE_CLIENT_ID) {
        return NextResponse.json({
            error: 'Google Client ID missing',
            message: 'Please ensure GOOGLE_CLIENT_ID is set in your environment.'
        }, { status: 500 });
    }

    const scope = 'openid email profile';
    const responseType = 'code';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

    return NextResponse.redirect(authUrl);
}
