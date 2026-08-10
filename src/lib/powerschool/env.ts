/**
 * PowerSchool env helpers — trim all values; never throw at import time.
 *
 * Required Vercel Production env vars:
 *   POWERSCHOOL_URL  (or POWERSCHOOL_HOST)  e.g. https://district.powerschool.com
 *   POWERSCHOOL_CLIENT_ID
 *   POWERSCHOOL_CLIENT_SECRET
 * Optional:
 *   ADMIN_SECRET  (Bearer gate for /api/integrations/powerschool/*)
 */

export type PowerSchoolCredentials = {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
};

export function getPowerSchoolCredentials():
  | { ok: true; credentials: PowerSchoolCredentials }
  | { ok: false; hint: string } {
  const baseUrl = (
    process.env.POWERSCHOOL_URL ||
    process.env.POWERSCHOOL_HOST ||
    ""
  ).trim().replace(/\/+$/, "");
  const clientId = (process.env.POWERSCHOOL_CLIENT_ID || "").trim();
  const clientSecret = (process.env.POWERSCHOOL_CLIENT_SECRET || "").trim();

  if (!baseUrl || !clientId || !clientSecret) {
    return {
      ok: false,
      hint: "Set POWERSCHOOL_URL (or POWERSCHOOL_HOST), POWERSCHOOL_CLIENT_ID, and POWERSCHOOL_CLIENT_SECRET on Production, then redeploy.",
    };
  }

  return {
    ok: true,
    credentials: { baseUrl, clientId, clientSecret },
  };
}

export function requireAdminSecret(request: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret) return false;
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${adminSecret}`;
}
