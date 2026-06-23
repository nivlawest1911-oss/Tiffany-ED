import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const allowedRoles = ["SUPERINTENDENT", "EXECUTIVE", "ADMIN"];

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: "Access Restricted" }, { status: 403 });
    }

    const body = await request.json();
    const { issuer, clientId, deploymentId, platformName, jwksUrl, authTokenUrl, authLoginUrl } = body;

    if (!issuer || !clientId || !jwksUrl || !authTokenUrl || !authLoginUrl) {
      return NextResponse.json(
        { error: "Missing required fields. Required: issuer, clientId, jwksUrl, authTokenUrl, authLoginUrl" },
        { status: 400 }
      );
    }

    // Upsert the platform config
    const platform = await prisma.ltiPlatform.upsert({
      where: { issuer },
      update: {
        clientId,
        deploymentId: deploymentId || null,
        platformName: platformName || "Canvas/Clever District Instance",
        jwksUrl,
        authTokenUrl,
        authLoginUrl,
        isActive: true,
      },
      create: {
        issuer,
        clientId,
        deploymentId: deploymentId || null,
        platformName: platformName || "Canvas/Clever District Instance",
        jwksUrl,
        authTokenUrl,
        authLoginUrl,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, platformId: platform.id });
  } catch (error: any) {
    console.error("[API LTI Register] Registration Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register LTI platform" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const allowedRoles = ["SUPERINTENDENT", "EXECUTIVE", "ADMIN"];

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: "Access Restricted" }, { status: 403 });
    }

    const platforms = await prisma.ltiPlatform.findMany({
      orderBy: { registeredAt: "desc" },
    });

    return NextResponse.json({ platforms });
  } catch (error: any) {
    console.error("[API LTI Register] Fetch Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve LTI platforms" },
      { status: 500 }
    );
  }
}
