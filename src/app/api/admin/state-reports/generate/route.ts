import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { districtId, reportType, period } = await req.json();

  if (!districtId || !reportType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // TODO: Pull real data from Unified Data Fabric / SIS
  const mockData = {
    totalStudents: 12480,
    attendanceRate: 94.2,
    chronicAbsenteeism: 8.7,
    generatedAt: new Date().toISOString(),
  };

  const report = await prisma.stateReport.create({
    data: {
      districtId,
      reportType,
      period: period || '2025-2026_Q1',
      status: 'draft',
      dataSnapshot: mockData,
    },
  });

  return NextResponse.json({
    success: true,
    reportId: report.id,
    message: `${reportType} report generated successfully`,
    preview: mockData,
  });
}
