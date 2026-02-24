import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        if (!supabase) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const userId = authUser.id;
        const { role, districtName, position } = await req.json();

        if (!role) {
            return new NextResponse('Role is required', { status: 400 });
        }

        // 1. Update Prisma User record with robust lookup
        console.log(`[SET_ROLE] Attempting persistence for user: ${userId} (${authUser.email})`);

        let user;
        try {
            // Try to find by clerkId first
            user = await prisma.user.findUnique({
                where: { clerkId: userId }
            });

            if (!user && authUser.email) {
                console.log(`[SET_ROLE] User not found by clerkId, checking email: ${authUser.email}`);
                user = await prisma.user.findUnique({
                    where: { email: authUser.email }
                });
            }

            if (user) {
                console.log(`[SET_ROLE] Updating existing user: ${user.id}`);
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        clerkId: userId, // Link Supabase ID if it was found by email
                        role: role.toUpperCase(),
                        district: districtName,
                        position: position
                    }
                });
            } else {
                console.log(`[SET_ROLE] Creating new user record`);
                user = await prisma.user.create({
                    data: {
                        clerkId: userId,
                        email: authUser.email || '',
                        role: role.toUpperCase(),
                        district: districtName,
                        position: position
                    }
                });
            }
        } catch (dbError: any) {
            console.error('[SET_ROLE_DB_ERROR]', {
                message: dbError.message,
                code: dbError.code,
                meta: dbError.meta
            });
            throw dbError;
        }

        // 2. Sync to Supabase Metadata
        console.log(`[SET_ROLE] Syncing to Supabase Metadata for: ${userId}`);
        const { error: supabaseError } = await supabase.auth.updateUser({
            data: {
                role: role.toUpperCase(),
                onboardingComplete: true
            }
        });

        if (supabaseError) {
            console.error('[SET_ROLE_SUPABASE_ERROR]', supabaseError);
            throw supabaseError;
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('[SET_ROLE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
