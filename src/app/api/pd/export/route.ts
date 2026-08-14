import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  const authHeader = req.headers.get("authorization");
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const completions = await (prisma as any).pdCompletion.findMany({
      orderBy: { completedAt: "desc" },
    });

    const header =
      "userId,email,alsdeId,teacherNumber,schoolName,moduleId,courseCode,title,clockHours,completedAt,verificationCode\n";
    const rows = completions
      .map(
        (c: any) =>
          `"${c.userId}","${c.email}","${c.alsdeId || ""}","${c.teacherNumber || ""}","${c.schoolName || ""}","${c.moduleId}","${c.courseCode}","${c.title}",${c.clockHours},"${c.completedAt.toISOString()}","${c.verificationCode}"`
      )
      .join("\n");

    const csv = header + rows;
    const disclaimer =
      "\n# LEA awards in PowerSchool PL under ALSDE rules; EdIntel does not auto-post PLUs.\n";

    return new Response(csv + disclaimer, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="pd_completions.csv"',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[pd/export]", message);
    // Auth succeeded; surface a controlled failure (often missing table/migration).
    return new Response(
      JSON.stringify({
        error: "PD export failed",
        detail: message.slice(0, 300),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
