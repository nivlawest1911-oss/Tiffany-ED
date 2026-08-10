import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // In a real app, this cron hits the global registry to find OPEN circuits
  // and sends a Slack or PagerDuty alert.
  
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = req.headers.get("authorization");
  // Prefer CRON_SECRET Bearer; also accept Vercel Cron's authorization header shape.
  const vercelCron = req.headers.get("x-vercel-cron");
  const authorized =
    (cronSecret && authHeader === `Bearer ${cronSecret}`) ||
    (cronSecret && vercelCron === "1" && authHeader === `Bearer ${cronSecret}`);
  if (!cronSecret || !authorized) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Simulated check
  const openCircuits: string[] = []; 

  if (openCircuits.length > 0) {
    console.log(`[Alert] Open circuits detected: ${openCircuits.join(", ")}`);
    // TODO: fetch(process.env.SLACK_WEBHOOK_URL, ...)
  }

  return new Response("OK", { status: 200 });
}
