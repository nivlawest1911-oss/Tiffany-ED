import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const range = req.nextUrl.searchParams.get("range") || "week";
  
  // Build date filter for the last 7 days
  const now = new Date();
  const startDate = new Date();
  if (range === "week") {
    startDate.setDate(now.getDate() - 7);
  } else {
    // Default fallback to 30 days if other ranges are added
    startDate.setDate(now.getDate() - 30);
  }

  try {
    const events = await prisma.time_saved_events.findMany({
      where: {
        userId: session.user.id,
        createdAt: { gte: startDate },
      },
    });

    const totalMinutes = events.reduce((sum, e) => sum + e.minutesSaved, 0);
    const hours = Math.round((totalMinutes / 60) * 10) / 10;
    
    // Group by action type for breakdown
    const actionCounts: Record<string, { minutes: number; count: number }> = {};
    for (const e of events) {
      if (!actionCounts[e.actionType]) {
        actionCounts[e.actionType] = { minutes: 0, count: 0 };
      }
      actionCounts[e.actionType].minutes += e.minutesSaved;
      actionCounts[e.actionType].count += 1;
    }

    const labels: Record<string, string> = {
      differentiate: "Differentiation",
      group_regen: "Smart Grouping",
      lesson_pack: "Tier Lesson Pack",
      export: "Export/Copy",
      tiffany: "Tiffany-ED Session",
    };

    const breakdown = Object.entries(actionCounts).map(([actionType, data]) => ({
      actionType,
      label: labels[actionType] || actionType,
      minutes: data.minutes,
      count: data.count,
    })).sort((a, b) => b.minutes - a.minutes);

    return NextResponse.json({
      hours,
      totalMinutes,
      eventCount: events.length,
      breakdown,
    });
  } catch (error) {
    console.error("Failed to fetch time saved data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { actionType, minutesSaved, metadata } = body;

    if (!actionType || typeof minutesSaved !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const event = await prisma.time_saved_events.create({
      data: {
        userId: session.user.id,
        actionType,
        minutesSaved,
        metadata: metadata || {},
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Failed to log time saved event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
