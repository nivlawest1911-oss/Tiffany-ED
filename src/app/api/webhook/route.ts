import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { sql } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret || webhookSecret === 'whsec_dummy') {
      // Skip verification during build or if secret is missing
      return NextResponse.json({ received: true, note: 'Verification skipped' });
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const email = session.customer_email || session.customer_details?.email;
      const customerId = session.customer as string;
      const name = session.metadata?.name || email?.split('@')[0] || 'Educator';

      if (email) {
        // Upsert user to 'professional' tier
        // This query assumes the table exists (which we created in lib/db.ts)
        await sql`
            INSERT INTO users (email, name, tier, stripe_customer_id, created_at)
            VALUES (${email}, ${name}, 'professional', ${customerId}, NOW())
            ON CONFLICT (email) 
            DO UPDATE SET 
                tier = 'professional',
                stripe_customer_id = ${customerId};
        `;

        console.log(`✅ Tier updated for ${email}`);
      }
    }
  } catch (err: any) {
    console.error(`Database Update Error: ${err.message}`);
    return new NextResponse("Database Error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
