import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  buildParentDigest,
  isSmtpConfigured,
  type DigestStudent,
} from "@/lib/parents/digest";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_ROLES = new Set([
  "TEACHER",
  "ADMIN",
  "SUPERINTENDENT",
  "EXECUTIVE",
  "DISTRICT_ADMIN",
  "PRINCIPAL",
]);

/**
 * POST /api/parents/digest/send
 * Body: { to: string | string[], className?, students?, teacherName?, weekOf? }
 * Requires SMTP_* env; otherwise returns 503 with clear preview-only message.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession({ headers: request.headers });
    const user = session?.user as { id?: string; role?: string; name?: string } | undefined;

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (user.role || "TEACHER").toUpperCase();
    if (!ALLOWED_ROLES.has(role)) {
      return NextResponse.json(
        { error: "Parent digests are role-gated to teachers and admins" },
        { status: 403 }
      );
    }

    if (!isSmtpConfigured()) {
      return NextResponse.json(
        {
          error: "Email delivery not configured",
          hint: "Set SMTP_HOST, SMTP_USER, and SMTP_PASS on Vercel, or use POST /api/parents/digest/preview for preview-only.",
          previewOnly: true,
        },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const toRaw = body.to;
    const recipients: string[] = Array.isArray(toRaw)
      ? toRaw.filter((t: unknown) => typeof t === "string" && t.includes("@"))
      : typeof toRaw === "string" && toRaw.includes("@")
        ? [toRaw]
        : [];

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "to (email or email[]) is required" },
        { status: 400 }
      );
    }

    const students: DigestStudent[] | undefined = Array.isArray(body.students)
      ? body.students.map((s: Record<string, unknown>) => ({
          firstName: String(s.firstName || s.name || "Student").split(" ")[0],
          grade: typeof s.grade === "string" ? s.grade : undefined,
          masteryHighlight:
            typeof s.masteryHighlight === "string" ? s.masteryHighlight : undefined,
          interventionNote:
            typeof s.interventionNote === "string" ? s.interventionNote : undefined,
        }))
      : undefined;

    const digest = buildParentDigest({
      className: typeof body.className === "string" ? body.className : undefined,
      teacherName:
        typeof body.teacherName === "string" ? body.teacherName : user.name || undefined,
      weekOf: typeof body.weekOf === "string" ? body.weekOf : undefined,
      students,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!.trim(),
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: (process.env.SMTP_PORT || "465") === "465",
      auth: {
        user: process.env.SMTP_USER!.trim(),
        pass: process.env.SMTP_PASS!.trim(),
      },
    });

    await transporter.sendMail({
      from: `"EdIntel Parent Digest" <${process.env.SMTP_USER!.trim()}>`,
      to: recipients.join(", "),
      subject: digest.subject,
      text: digest.markdown,
      html: digest.html,
    });

    return NextResponse.json({
      success: true,
      sentTo: recipients.length,
      subject: digest.subject,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Send failed";
    console.error("[parents/digest/send]", message);
    return NextResponse.json(
      { error: "Failed to send digest", detail: message },
      { status: 503 }
    );
  }
}
