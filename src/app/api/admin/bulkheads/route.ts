import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  const authHeader = req.headers.get("authorization");
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // In a real app, you would query the global bulkhead registry.
  // Stub for MVP:
  return new Response(JSON.stringify({
    bulkheads: [
      {
        name: "powerschool-interactive",
        active: 0,
        queued: 0,
        maxConcurrent: 10,
        maxQueued: 50
      }
    ]
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
