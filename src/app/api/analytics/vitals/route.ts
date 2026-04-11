import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface VitalMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
  url: string;
  timestamp: number;
}

export async function POST(request: Request) {
  try {
    const metric: VitalMetric = await request.json();
    
    // Log metrics for monitoring (in production, send to analytics service)
    console.log('[Web Vitals]', JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: metric.url,
      timestamp: new Date(metric.timestamp).toISOString(),
    }));

    // Here you could send to:
    // - Vercel Analytics (already integrated)
    // - Custom analytics database
    // - Third-party monitoring services
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Web Vitals] Error processing metric:', error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
