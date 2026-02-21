import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

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
                email: (await currentUser())?.primaryEmailAddress?.emailAddress || '',
                role: role.toUpperCase(),
                district: districtName,
                position: position
            }
        });

        // 2. Sync to Clerk Metadata
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
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
