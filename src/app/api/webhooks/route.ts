import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST() {
  return NextResponse.json({ message: 'Webhook Node Active' }, { status: 200 });
}
