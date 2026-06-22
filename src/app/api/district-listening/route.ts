import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { districtListeningService } from '@/lib/DistrictListeningService';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor', district: 'district-01' };
    }

    const districtId = user.district || 'district-01';
    
    // Retrieve the latest snapshot
    const snapshot = await districtListeningService.getLatestSnapshot(districtId);
    if (!snapshot) {
      return NextResponse.json({ error: 'No district records found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const compileBrief = searchParams.get('brief') === 'true';

    let executiveBrief = null;
    if (compileBrief) {
      console.info(`[District Listening API] Triggering AI executive strategic brief for district: ${districtId}`);
      executiveBrief = await districtListeningService.generateDistrictBrief(districtId);
    }

    return NextResponse.json({
      success: true,
      snapshot,
      executiveBrief
    });
  } catch (error: any) {
    console.error('[API District Listening GET] Error:', error);
    return NextResponse.json(
      { error: error.message || 'District intelligence fetch failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized administrative operation' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      districtId,
      titleIRevenue,
      erateCat2Budget,
      hardwareScore,
      broadbandMbps,
      teacherTrainingPct,
      enrollmentTotal,
      freeReducedPct,
      elaProficiencyPct,
      mathProficiencyPct
    } = body;

    if (!districtId) {
      return NextResponse.json({ error: 'districtId is required' }, { status: 400 });
    }

    // Persist new snapshot in postgres database
    const snapshot = await prisma.district_listening.create({
      data: {
        district_id: districtId,
        title_i_revenue: titleIRevenue ? parseFloat(titleIRevenue) : null,
        erate_cat2_budget: erateCat2Budget ? parseFloat(erateCat2Budget) : null,
        hardware_score: hardwareScore ? parseFloat(hardwareScore) : null,
        broadband_mbps: broadbandMbps ? parseFloat(broadbandMbps) : null,
        teacher_training_pct: teacherTrainingPct ? parseFloat(teacherTrainingPct) : null,
        enrollment_total: enrollmentTotal ? parseInt(enrollmentTotal) : null,
        free_reduced_pct: freeReducedPct ? parseFloat(freeReducedPct) : null,
        ela_proficiency_pct: elaProficiencyPct ? parseFloat(elaProficiencyPct) : null,
        math_proficiency_pct: mathProficiencyPct ? parseFloat(mathProficiencyPct) : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'District Listening Snapshot logged successfully.',
      snapshot
    });
  } catch (error: any) {
    console.error('[API District Listening POST] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to log district snapshot' },
      { status: 500 }
    );
  }
}
