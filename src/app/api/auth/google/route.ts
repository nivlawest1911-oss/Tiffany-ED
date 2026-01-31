import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

    // Use request host to ensure redirect stays on the current domain
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const domain = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

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
