import { NextResponse } from 'next/server';

export async function GET() {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || 'https://edintel-app.vercel.app'}/api/auth/google/callback`;

    if (!GOOGLE_CLIENT_ID) {
        return NextResponse.json({ error: 'Google Client ID missing' }, { status: 500 });
    }

    const scope = 'openid email profile';
    const responseType = 'code';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

    return NextResponse.redirect(authUrl);
}
