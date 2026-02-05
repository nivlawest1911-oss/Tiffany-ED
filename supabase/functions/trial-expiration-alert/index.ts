import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
    const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Find users expiring in the next 48 hours
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    const dateString = twoDaysFromNow.toISOString().split('T')[0];

    const { data: expiringUsers } = await supabase
        .from('subscriptions')
        .select('*, profiles(email, full_name)')
        // Basic filter for trial_end date matching user's suggestion. 
        // Ideally we'd use a range or date_trunc but 'ilike' %dateString% works if trial_end is a string or compatible.
        // Assuming trial_end is timestamp with time zone, ilike %YYYY-MM-DD% might catch it if cast to text.
        // A better approach for timestamps is ranges, but sticking to user logic for now.
        // However, filtering on a timestamp column with ilike requires casting.
        // User logic: .filter('trial_end', 'ilike', `%${dateString}%`)
        // I will assume the user knows their schema or I should cast. 
        // To be safe, I'll use the user's provided code logic which assumes simple string matching or auto-casting.
        .filter('trial_end', 'ilike', `%${dateString}%`)

    // Send Emails via Resend (Using your existing Resend logic)
    for (const sub of expiringUsers || []) {
        if (sub.profiles?.email) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Dr. Alvin West <alvin@edintel.app>',
                    to: sub.profiles.email,
                    subject: 'URGENT: Your Sovereign Node Authority is Expiring',
                    html: `
                <div style="background: #09090b; color: #fafafa; padding: 40px; font-family: sans-serif;">
                    <h1 style="color: #f59e0b;">PROTOCOL WARNING</h1>
                    <p>Dr. ${sub.profiles.full_name || 'Educator'},</p>
                    <p>Your 14-day <strong>Sovereign Initiate</strong> window is closing in 48 hours.</p>
                    <p>To prevent a "Neural Link Severance" and maintain access to the <strong>Sovereign Studio</strong> (Canva, InVideo, Adobe), you must elevate your node to <strong>Site Command</strong>.</p>
                    <a href="https://edintel.app/pricing" style="background: #f59e0b; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px;">UPGRADE TO SITE COMMAND</a>
                    <p style="margin-top: 20px; font-size: 10px; color: #71717a;">OFFICIAL EDINTEL SOVEREIGN PROTOCOL ALERT</p>
                </div>
                `
                })
            })
        }
    }

    return new Response(JSON.stringify({ sent: expiringUsers?.length }), { status: 200 })
})
