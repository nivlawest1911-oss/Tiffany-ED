// 🦅 SOVEREIGN EDGE: Admin Notification Node
// Resides on the Edge for <50ms latency.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("Sovereign Notification Node: ONLINE");

serve(async (req) => {
    // 1. Validation Handshake
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
    }

    try {
        const { record, type } = await req.json()
        const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
        const WHATSAPP_ID = Deno.env.get('WHATSAPP_PHONE_ID');
        const ADMIN_PHONE = "12514229420"; // Dr. West Direct Line

        if (!WHATSAPP_TOKEN) throw new Error("Missing Holo-Auth Token");

        // 2. Construct the Sovereign Alert
        let templateName = "sovereign_general_alert";
        let params = [];

        if (type === 'NEW_LEAD') {
            templateName = "sovereign_lead_alert";
            params = [
                { type: "text", text: record.school_name || "Unknown Site" },
                { type: "text", text: record.admin_name || "Principal" }
            ];
        } else if (type === 'ENERGY_CRITICAL') {
            templateName = "sovereign_energy_alert";
            params = [
                { type: "text", text: record.school_name },
                { type: "text", text: `${record.balance} U` }
            ];
        }

        // 3. Fire the Neural Message
        const response = await fetch(`https://graph.facebook.com/v17.0/${WHATSAPP_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: ADMIN_PHONE,
                type: "template",
                template: {
                    name: templateName,
                    language: { code: "en_US" },
                    components: [{
                        type: "body",
                        parameters: params
                    }]
                }
            }),
        })

        const result = await response.json();
        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
})
