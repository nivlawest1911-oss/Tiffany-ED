// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()

    try {
        const event = stripe.webhooks.constructEvent(body, signature!, Deno.env.get('STRIPE_WEBHOOK_SECRET')!)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.client_reference_id; // Pass this in your frontend call
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const productName = lineItems.data[0].description || lineItems.data[0].product_data?.name || "Standard Pack"; // Access description from line item

            console.log(`Processing Protocol: ${productName} for User ${userId}`);

            if (userId) {
                // Set trial length based on the specific Sovereign logic
                // Note: The database trigger also handles this, but we calculate it here for logging or explicit update if needed.
                const isInitiate = productName.includes("Initiate");
                const trialDays = isInitiate ? 14 : 30;
                const trialEndDate = new Date();
                trialEndDate.setDate(trialEndDate.getDate() + trialDays);

                // UPDATE SUPABASE: Sync the subscription status
                const { error } = await supabase
                    .from('subscriptions')
                    .upsert({
                        user_id: userId,
                        tier_name: productName,
                        status: 'active',
                        trial_end: trialEndDate.toISOString(), // Explicitly setting it, overriding trigger if already inserted? Upsert handles it.
                    })

                if (error) {
                    console.error('Supabase error:', error)
                    return new Response(`Supabase Error: ${error.message}`, { status: 500 })
                }

                console.log(`Protocol Activated: ${productName} for User ${userId}. Trial ends: ${trialEndDate}`);
            } else {
                console.warn("No client_reference_id found in session.");
            }
        }

        return new Response(JSON.stringify({ received: true }), { status: 200 })
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`)
        return new Response(`Error: ${err.message}`, { status: 400 })
    }
})
