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
    // Only allow POST requests
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
    }

    const signature = req.headers.get('stripe-signature')
    const body = await req.text()

    try {
        const secret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
        if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET not set')

        const event = stripe.webhooks.constructEvent(body, signature!, secret)

        console.log(`[STRIPE WEBHOOK] Received event: ${event.type}`)

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const userId = session.client_reference_id;
                const customerId = session.customer as string;

                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                const description = lineItems.data[0].description || "Sovereign Protocol";

                console.log(`[STRIPE] Checkout completed for User ${userId}, Customer ${customerId}`);

                if (userId) {
                    // Update user profile with stripe customer ID if needed
                    // (Assuming you have a profiles table)
                    await supabase
                        .from('profiles')
                        .update({ stripe_customer_id: customerId })
                        .eq('id', userId);

                    // Activated subscription logic
                    const isInitiate = description.includes("Initiate");
                    const trialDays = isInitiate ? 14 : 30;
                    const trialEndDate = new Date();
                    trialEndDate.setDate(trialEndDate.getDate() + trialDays);

                    const { error } = await supabase
                        .from('subscriptions')
                        .upsert({
                            user_id: userId,
                            tier_name: description,
                            status: 'active',
                            trial_end: trialEndDate.toISOString(),
                        })

                    if (error) console.error('Supabase subscription upsert error:', error)
                }
                break;
            }

            case 'customer.subscription.updated':
            case 'customer.subscription.created': {
                const subscription = event.data.object;
                const customerId = subscription.customer as string;
                const status = subscription.status;

                // Get the user from their stripe customer id
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('stripe_customer_id', customerId)
                    .single();

                if (profile) {
                    await supabase
                        .from('subscriptions')
                        .update({ status: status })
                        .eq('user_id', profile.id);

                    console.log(`[STRIPE] Subscription for ${profile.id} updated to ${status}`);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const customerId = subscription.customer as string;

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('stripe_customer_id', customerId)
                    .single();

                if (profile) {
                    await supabase
                        .from('subscriptions')
                        .update({ status: 'canceled' })
                        .eq('user_id', profile.id);

                    console.log(`[STRIPE] Subscription for ${profile.id} set to canceled`);
                }
                break;
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (err) {
        console.error(`[STRIPE WEBHOOK ERROR] ${err.message}`)
        return new Response(`Error: ${err.message}`, { status: 400 })
    }
})
