import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { DistrictService } from '@/lib/DistrictService';
import { logUnitySync } from '@/lib/legacy-ledger';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { districtId } = await request.json();
        if (!districtId) {
            return NextResponse.json({ error: 'District ID is required' }, { status: 400 });
        }

        const health = await DistrictService.getGlobalHealth(districtId);
        if (!health) {
            return NextResponse.json({ error: 'District not found' }, { status: 404 });
        }

        // Fetch nodes for logging
        const districts = await DistrictService.getDistricts();
        const district = districts.find(d => d.id === districtId);

        await logUnitySync(session.user.id, {
            id: uuidv4(),
            globalScore: health.score,
            nodeStatuses: district?.nodes || [],
            totalSwarms: health.totalSwarms,
            timestamp: new Date().toISOString(),
            hash: 'SHA-256-UNITY-' + Math.random().toString(36).substring(7)
        });

        return NextResponse.json({ success: true, health });
    } catch (error) {
        console.error('[Districts Sync API] POST Error:', error);
        return NextResponse.json({ error: 'Synchronization failed' }, { status: 500 });
    }
}
