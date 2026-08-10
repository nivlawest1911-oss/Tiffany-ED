import { NextRequest } from "next/server";
// In a real app, you would import a global circuit registry here.
// For this MVP, we return a structural stub.

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  const authHeader = req.headers.get("authorization");
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify({
    circuits: [
      {
        name: "powerschool-api",
        state: "closed",
        failures: 0,
        nextAttempt: null
      }
    ]
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
