import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let isAuthorized = false;

  // 1. Check ADMIN_SECRET Bearer
  const authHeader = req.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.substring(7).trim();
    if (adminSecret && token === adminSecret) {
      isAuthorized = true;
    }
  }

  // 2. Check session admin
  if (!isAuthorized) {
    try {
      const session = await auth.api.getSession({ headers: req.headers });
      const user = session?.user as any;
      if (
        user?.role === "ADMIN" ||
        user?.role === "SUPERINTENDENT" ||
        user?.role === "PRINCIPAL" ||
        user?.role === "EXECUTIVE"
      ) {
        isAuthorized = true;
      }
    } catch (e) {
      // Session error -> treat as unauthorized, do not 500
    }
  }

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Generate mock EWS alerts. In production, this would query DB/models
    const alerts = [
      {
        id: "ews-1",
        severity: "critical",
        title: "High Tier 3 Concentration",
        reason: "42% of 3rd grade students at Lincoln Elementary are scoring in Tier 3 reading foundations.",
        suggestedAction: "Generate a Tier 3 Intervention Pack.",
        href: "/grouping",
      },
      {
        id: "ews-2",
        severity: "warning",
        title: "Stale Mastery Signals",
        reason: "No new formative assessment data received for Mr. Davis's class in 14 days.",
        suggestedAction: "Nudge teacher to input latest checks for understanding.",
        href: "/progress",
      },
      {
        id: "ews-3",
        severity: "info",
        title: "Low Growth Cohort",
        reason: "A 5th-grade subgroup showed <5% growth in fluency over the last reporting period.",
        suggestedAction: "Review current lesson plans in Tiffany-ED.",
        href: "/tiffany-ed",
      },
      {
        id: "ews-4",
        severity: "warning",
        title: "PowerSchool Sync Deferred",
        reason: "Attendance and roster data sync has not completed today.",
        suggestedAction: "Check PowerSchool Integration Settings.",
        href: "/admin/settings",
      }
    ];

    return NextResponse.json({ alerts });
  } catch (error) {
    console.error("Failed to generate EWS alerts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
