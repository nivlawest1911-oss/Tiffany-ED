import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function sendWelcomeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[EMAIL_SERVICE] RESEND_API_KEY missing, skipping welcome email.');
        return;
    }

    try {
        await resend.emails.send({
            from: 'EdIntel Sovereignty <welcome@edintel.app>',
            to: [email],
            subject: 'Welcome to EdIntel SOVEREIGN | Your Master Access Initiated 🚀',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
                    <h1 style="color: #10b981; text-transform: uppercase; letter-spacing: 2px;">Welcome to the Command Deck</h1>
                    <p>Dear ${name},</p>
                    <p>Welcome to the future of educational leadership. Your Master Access to <strong>EdIntel SOVEREIGN (2027)</strong> has been successfully provisioned.</p>
                    
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <h2 style="font-size: 16px; margin-top: 0;">Your Sovereign Journey Begins Now:</h2>
                        <ul style="padding-left: 20px;">
                            <li style="margin-bottom: 10px;"><strong>14-Day Full Access Trial:</strong> You have 14 days of unrestricted access to the complete Sovereign Intelligence suite.</li>
                            <li style="margin-bottom: 10px;"><strong>The Token System:</strong> Your account has been credited with your initial strategic tokens. These power your interactions with the Sovereign Mentor and the Neuro-Resilience Briefing engine.</li>
                            <li><strong>Command Deck:</strong> <a href="https://edintel-app.vercel.app/dashboard" style="color: #10b981; font-weight: bold;">Access your dashboard here</a> to begin your first briefing.</li>
                        </ul>
                    </div>

                    <p><strong>Pro-Tip:</strong> As an early adopter, you have access to the <strong>Zero-Gravity Mode</strong>—unlocked via the toggle on your dashboard for a fluid, low-latency strategic experience.</p>
                    
                    <p>Should you require any assistance, our strategic support team is available at <a href="mailto:admin@edintel.app">admin@edintel.app</a>.</p>
                    
                    <p style="margin-top: 40px; border-top: 1px solid #eee; pt-20px; font-size: 12px; color: #666;">
                        Welcome aboard,<br/>
                        <strong>The EdIntel Sovereignty Team</strong><br/>
                        <em>Strategic Leadership Node: Alabama/Mobile County</em>
                    </p>
                </div>
            `
        });
        console.log(`[EMAIL_SERVICE] Welcome email dispatched to ${email}`);
    } catch (error) {
        console.error('[EMAIL_SERVICE] Failed to send welcome email:', error);
    }
}
