import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get('districtId');
  const days = parseInt(searchParams.get('days') || '30');

  const since = new Date();
  since.setDate(since.getDate() - days);

  const where: any = {
    createdAt: { gte: since },
  };
  if (districtId) where.districtId = districtId;

  const metrics = await prisma.usageMetric.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  const summary = await prisma.usageMetric.aggregate({
    where,
    _sum: { tokensUsed: true, estimatedCost: true },
    _count: { _all: true },
  });

  return NextResponse.json({
    summary: {
      totalSessions: summary._count._all,
      totalTokens: summary._sum.tokensUsed || 0,
      totalCostUSD: summary._sum.estimatedCost || 0,
    },
    metrics,
  });
}
