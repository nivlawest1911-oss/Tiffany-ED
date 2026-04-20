import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getSession } from '@/lib/auth';
import { DistrictService } from '@/lib/DistrictService';

export async function GET() {
    try {
        const districts = await DistrictService.getDistricts();
        return NextResponse.json(districts);
    } catch (error) {
        console.error('[Districts API] GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch districts' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, nodes } = await request.json();
        if (!name) {
            return NextResponse.json({ error: 'District name is required' }, { status: 400 });
        }

        const districtId = await DistrictService.ingestDistrict(name, nodes || [
            'Fiscal', 'Roster', 'Oracle', 'Vault', 'Gym',
            'Transit', 'Medical', 'Legal', 'Curriculum',
            'Safety', 'Crisis', 'Community'
        ]);

        return NextResponse.json({ id: districtId, success: true });
    } catch (error) {
        console.error('[Districts API] POST Error:', error);
        return NextResponse.json({ error: 'Failed to ingest district' }, { status: 500 });
    }
}
