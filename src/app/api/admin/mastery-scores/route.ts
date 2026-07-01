import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  const masteryScores = await prisma.masteryScore.findMany({
    where: { studentId },
    include: {
      skillNode: true,
    },
    orderBy: { recordedAt: 'desc' },
  });

  return NextResponse.json({
    studentId,
    masteryScores,
    lastUpdated: new Date().toISOString(),
  });
}
