import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { vigiAppService } from '@/lib/VIGIAppService';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Technician', school_id: 'school-01' };
    }

    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId') || user.school_id || 'school-01';

    // Fetch school health score
    const health = await vigiAppService.getSchoolHealthScore(schoolId);
    
    // Fetch registered devices
    const devices = await prisma.infra_monitors.findMany({
      where: { school_id: schoolId },
      orderBy: { device_name: 'asc' }
    });

    // Fetch active unacknowledged alerts
    const alerts = await vigiAppService.getActiveAlerts(schoolId);

    return NextResponse.json({
      success: true,
      health,
      devices,
      alerts
    });
  } catch (error: any) {
    console.error('[API VIGIApp GET] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Infrastructure telemetry retrieval failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized system configuration' }, { status: 401 });
    }

    const body = await request.json();
    const { schoolId, deviceType, deviceName, location, alertThresholds } = body;

    if (!schoolId || !deviceType || !deviceName) {
      return NextResponse.json(
        { error: 'Missing required parameters. Required: schoolId, deviceType, deviceName' },
        { status: 400 }
      );
    }

    const device = await vigiAppService.registerDevice({
      schoolId,
      deviceType,
      deviceName,
      location,
      alertThresholds
    });

    return NextResponse.json({
      success: true,
      message: 'Infrastructure monitor registered successfully.',
      device
    });
  } catch (error: any) {
    console.error('[API VIGIApp POST] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Device registration failed' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor' };
    }

    const body = await request.json();
    const { alertId } = body;

    if (!alertId) {
      return NextResponse.json({ error: 'alertId is required for acknowledgment' }, { status: 400 });
    }

    const resolved = await vigiAppService.acknowledgeAlert(alertId, user.id);

    return NextResponse.json({
      success: true,
      message: 'Infrastructure alert acknowledged.',
      resolved
    });
  } catch (error: any) {
    console.error('[API VIGIApp PATCH] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to acknowledge alert' },
      { status: 500 }
    );
  }
}
