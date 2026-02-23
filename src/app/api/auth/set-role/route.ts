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

        // 1. Update Prisma User record
        const user = await prisma.user.upsert({
            where: { clerkId: userId },
            update: {
                role: role.toUpperCase(),
                district: districtName,
                position: position
            },
            create: {
                clerkId: userId,
                email: authUser.email || '',
                role: role.toUpperCase(),
                district: districtName,
                position: position
            }
        });

        // 2. Sync to Supabase Metadata
        await supabase.auth.updateUser({
            data: {
                role: role.toUpperCase(),
                onboardingComplete: true
            }
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('[SET_ROLE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
