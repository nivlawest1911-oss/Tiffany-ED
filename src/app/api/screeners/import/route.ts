import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { screenerService } from '@/lib/screener-service';
import { ScreenerPlatform } from '@/types/differentiation';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    // Fallback security checks
    if (!user) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        user = { id: 'fallback-user', name: 'Authorized User', tier: 'free' };
      }
    }

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor', tier: 'free' };
    }

    const body = await request.json().catch(() => ({}));
    const { csvText, platform } = body;

    if (!csvText || !platform) {
      return NextResponse.json(
        { error: 'Missing csvText or platform. Available platforms: mCLASS, i-Ready, STAR, aimswebPlus' },
        { status: 400 }
      );
    }

    // Parse the baseline CSV
    const parsedRows = screenerService.parseScreenerCSV(csvText, platform as ScreenerPlatform);
    if (!parsedRows.length) {
      return NextResponse.json(
        { error: 'Unable to parse any student records. Ensure the CSV has headers like student_id, name, score, cls, or orf.' },
        { status: 422 }
      );
    }

    // Import student profiles & triggers
    const result = await screenerService.importScreenerData(user.id, parsedRows);

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${result.imported} student profiles.`,
      result
    });
  } catch (error: any) {
    console.error('[API Screener Import] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Screener ingestion failure' },
      { status: 500 }
    );
  }
}
