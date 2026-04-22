import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/generated/prisma';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            // This is expected when users complete onboarding before signing in
            // The OnboardingFlow saves data locally as a fallback, so this is not an error
            return NextResponse.json({
                error: 'Unauthorized',
                reason: !session ? 'No session found' : 'No user in session',
                message: 'Session not available. Data should be saved locally and synced after authentication.'
            }, { status: 401 });
        }

        const userId = session.user.id;
        const email = session.user.email;
        const body = await req.json();
        const { role, districtName, position } = body;

        // 1. Input Validation
        if (!role || typeof role !== 'string') {
            console.error(`[SET_ROLE] Invalid role provided for userId ${userId}: ${role}`);
            return NextResponse.json({ error: 'Role is required' }, { status: 400 });
        }

        const validRoles = Object.values(UserRole);
        const normalizedRole = role.toUpperCase() as UserRole;
        if (!validRoles.includes(normalizedRole)) {
            console.error(`[SET_ROLE] Unsupported role provided for userId ${userId}: ${role}`);
            return NextResponse.json({ error: 'Unsupported role provided' }, { status: 400 });
        }

        if (!email || !email.includes('@')) {
            console.error(`[SET_ROLE] Invalid email associated with userId ${userId}: ${email}`);
            return NextResponse.json({ error: 'Valid email is required for persistence' }, { status: 400 });
        }

        console.log(`[SET_ROLE] Initiating persistence for user: ${userId} (${email}) | Role: ${normalizedRole}`);

        // 2. Robust Database Persistence (Prisma)
        let userRecord;
        try {
            // Attempt 1: Lookup by clerkId (primary)
            userRecord = await prisma.user.findUnique({
                where: { clerkId: userId }
            });

            // Attempt 2: Fallback to email (link existing record if found)
            if (!userRecord) {
                console.info(`[SET_ROLE] User ${userId} not found by ID, searching by email: ${email}`);
                userRecord = await prisma.user.findUnique({
                    where: { email: email }
                });

                if (userRecord && !userRecord.clerkId) {
                    console.info(`[SET_ROLE] Linking existing user record ${userRecord.id} with new ID: ${userId}`);
                }
            }

            // Upsert Logic: Create or Update
            if (userRecord) {
                console.log(`[SET_ROLE] Updating user record: ${userRecord.id}`);
                userRecord = await prisma.user.update({
                    where: { id: userRecord.id },
                    data: {
                        clerkId: userId, // Ensure ID is linked
                        role: normalizedRole,
                        district: districtName || userRecord.district,
                        position: position || userRecord.position,
                        lastLogin: new Date()
                    }
                });
            } else {
                console.log(`[SET_ROLE] Creating new user record for ${email}`);
                userRecord = await prisma.user.create({
                    data: {
                        clerkId: userId,
                        email: email,
                        role: normalizedRole,
                        district: districtName,
                        position: position
                    }
                });
            }
        } catch (dbError: any) {
            console.error('[SET_ROLE_PRISMA_ERROR]', {
                userId,
                email,
                message: dbError.message,
                code: dbError.code,
                meta: dbError.meta
            });
            return NextResponse.json(
                { error: 'Database persistence failed. Please check connection settings.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `EdIntel Handshake successful for ${email}`,
            user: {
                id: userRecord.id,
                role: userRecord.role,
                onboardingComplete: true
            }
        });
    } catch (error: any) {
        console.error('[SET_ROLE_CRITICAL_FAILURE]', error);
        return NextResponse.json(
            { error: 'A critical error occurred during onboarding.' },
            { status: 500 }
        );
    }
}
