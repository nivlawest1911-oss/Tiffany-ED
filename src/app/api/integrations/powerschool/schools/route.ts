/**
 * PowerSchool Schools API
 *
 * Required Vercel env (Production):
 *   POWERSCHOOL_URL or POWERSCHOOL_HOST
 *   POWERSCHOOL_CLIENT_ID
 *   POWERSCHOOL_CLIENT_SECRET
 * Auth: Authorization: Bearer ${ADMIN_SECRET}
 *
 * Safe without env: returns 503 JSON hint (no build break, no stack dumps).
 */
import { NextRequest, NextResponse } from "next/server";
import { PowerSchoolClient } from "@/lib/powerschool/client";
import { getPowerSchoolCredentials, requireAdminSecret } from "@/lib/powerschool/env";
import { withResilience } from "@/lib/resilience/compose";
import { Bulkhead } from "@/lib/resilience/bulkhead";
import { CircuitBreaker } from "@/lib/resilience/circuit-breaker";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const workloadBulkhead = new Bulkhead("powerschool-interactive", 10, 50, 5000);
const circuitBreaker = new CircuitBreaker("powerschool-api", {
  failureThreshold: 5,
  resetTimeoutMs: 30000,
});

export async function GET(req: NextRequest) {
  if (!requireAdminSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const creds = getPowerSchoolCredentials();
  if (!creds.ok) {
    return NextResponse.json(
      {
        error: "PowerSchool credentials not configured",
        hint: creds.hint,
      },
      { status: 503 }
    );
  }

  const { baseUrl, clientId, clientSecret } = creds.credentials;
  const client = new PowerSchoolClient(baseUrl, clientId, clientSecret);

  try {
    const data = await withResilience(() => client.getSchools(), {
      workloadBulkhead,
      circuitBreaker,
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string };
    console.error("PowerSchool schools API error:", err?.message || error);

    if (err?.name === "BulkheadRejectedError" || err?.name === "CircuitOpenError") {
      return NextResponse.json(
        { error: err.message || "PowerSchool temporarily unavailable" },
        { status: 503, headers: { "Retry-After": "30" } }
      );
    }

    return NextResponse.json(
      {
        error: "PowerSchool request failed",
        detail: err?.message || "Unknown error",
      },
      { status: 503 }
    );
  }
}
