import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global Tier Middleware
 * Intercepts hits to premium modules and redirects based on user tier.
 */
const TIER_LINKS = {
    'Sovereign Initiate': '/pricing',
    'Standard Pack': 'https://buy.stripe.com/Standard_Link',
    'Sovereign Pack': 'https://buy.stripe.com/Sovereign_Link',
    'Practitioner': 'https://buy.stripe.com/Practitioner_Link',
    'Director Pack': 'https://buy.stripe.com/Director_Link',
    'Site Command': 'https://buy.stripe.com/Site_Command_Link'
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1. Define Premium Route Patterns
    const isEducationVault = pathname.startsWith('/vault'); // Sovereign Pack+
    const isIEPArchitect = pathname.startsWith('/generators'); // Standard Pack+
    const isWellnessInsights = pathname.startsWith('/professional'); // Practitioner+
    const isDirectorPortal = pathname.startsWith('/the-room'); // Director Pack
    const isSiteCommand = pathname.startsWith('/admin'); // Site Command

    // 0. Redirect base dashboard to education view
    if (pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/education', req.url));
    }

    // 2. Mock User Tier (In production, pull this from Supabase/Auth cookie)
    // For demonstration: User is an 'Initiate'
    const userTier = req.cookies.get('user_tier')?.value || 'Sovereign Initiate';

    // 3. THE REDIRECT LOGIC: Redirect if user hits a link above their tier
    if (isSiteCommand && userTier !== 'Site Command') {
        return NextResponse.redirect(new URL(TIER_LINKS['Site Command'], req.url));
    }

    if (isDirectorPortal && !['Director Pack', 'Site Command'].includes(userTier)) {
        return NextResponse.redirect(new URL(TIER_LINKS['Director Pack'], req.url));
    }

    if (isWellnessInsights && ['Sovereign Initiate', 'Standard Pack', 'Sovereign Pack'].includes(userTier)) {
        return NextResponse.redirect(new URL(TIER_LINKS['Practitioner'], req.url));
    }

    if (isEducationVault && ['Sovereign Initiate', 'Standard Pack'].includes(userTier)) {
        return NextResponse.redirect(new URL(TIER_LINKS['Sovereign Pack'], req.url));
    }

    if (isIEPArchitect && userTier === 'Sovereign Initiate') {
        return NextResponse.redirect(new URL(TIER_LINKS['Standard Pack'], req.url));
    }

    return NextResponse.next();
}

// Ensure middleware only runs on relevant app routes
export const config = {
    matcher: [
        '/vault/:path*',
        '/generators/:path*',
        '/professional/:path*',
        '/the-room/:path*',
        '/admin/:path*',
    ],
};
