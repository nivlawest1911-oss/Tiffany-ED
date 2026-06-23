import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const role = user.role;
    const allowedRoles = ["SUPERINTENDENT", "EXECUTIVE", "ADMIN"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Access Restricted" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const typeFilter = searchParams.get("type") || "all";
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Construct prisma query where filters
    const where: any = {};

    if (typeFilter !== "all") {
      where.interactionType = typeFilter;
    }

    if (search) {
      where.OR = [
        {
          teacher: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          teacher: {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          standardsAligned: {
            hasSome: [search],
          },
        },
      ];
    }

    const [logs, total] = await Promise.all([
      prisma.educatorAIInteraction.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          timestamp: "desc",
        },
        include: {
          teacher: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          student: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      }),
      prisma.educatorAIInteraction.count({ where }),
    ]);

    return NextResponse.json({ logs, total });
  } catch (error: any) {
    console.error("[API Educator Audit] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch interaction logs" },
      { status: 500 }
    );
  }
}
