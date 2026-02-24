import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        if (!supabase) {
            console.warn('[SET_ROLE] Unauthorized attempt: Supabase client initialization failed.');
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) {
            console.warn('[SET_ROLE] Unauthorized attempt: No authenticated user found.');
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const userId = authUser.id;
        const body = await req.json();
        const { role, districtName, position } = body;
        const email = authUser.email;

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

        // 3. Metadata Synchronization (Supabase)
        console.log(`[SET_ROLE] Syncing metadata to Supabase Auth for ${userId}`);
        const { error: supabaseError } = await supabase.auth.updateUser({
            data: {
                role: normalizedRole,
                onboardingComplete: true,
                district: districtName,
                position: position
            }
        });

        if (supabaseError) {
            console.error('[SET_ROLE_SUPABASE_SYNC_ERROR]', supabaseError);
            // We don't fail the whole request if metadata sync fails but DB succeeded,
            // but we should warn the client.
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
