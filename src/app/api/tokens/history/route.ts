import { NextResponse } from 'next/server';
import { TokenService } from '@/lib/services/token-service';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const history = await TokenService.getHistory(session.user.id, 20); // Fetch last 20 transactions

        return NextResponse.json({ history });
    } catch (error) {
        console.error('[TokenHistory API] Failed to fetch history:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transaction history' },
            { status: 500 }
        );
    }
}
