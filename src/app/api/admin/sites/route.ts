import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseKey, {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
            },
        });

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userEmail = user.email?.toLowerCase();

        // Fetch user metadata and role from our DB
        const dbUser = await prisma.user.findUnique({
            where: { email: userEmail },
            include: {
                schoolRelation: true,
            }
        });

        if (!dbUser) {
            return NextResponse.json({ error: 'User record not found' }, { status: 404 });
        }

        // Access Control Logic
        const isDistrictAdmin = ['SUPERINTENDENT', 'EXECUTIVE'].includes(dbUser.role);
        const isAdmin = dbUser.role === 'ADMIN';

        if (!isDistrictAdmin && !isAdmin) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        let sites: { id: string, name: string }[] = [];

        if (isDistrictAdmin && dbUser.schoolRelation?.districtName) {
            // Fetch all schools in the same district
            const schools = await prisma.school.findMany({
                where: { districtName: dbUser.schoolRelation.districtName },
                select: { id: true, name: true }
            });
            sites = schools;
        } else if (dbUser.schoolId) {
            // Return only their assigned school
            sites = [{
                id: dbUser.schoolId,
                name: dbUser.schoolRelation?.name || 'My School Site'
            }];
        }

        return NextResponse.json({ sites });

    } catch (error: any) {
        console.error('ðŸ›ï¸ [EdIntel_Sites] Protocol Failure:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
