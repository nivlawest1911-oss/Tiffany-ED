import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Strategic SMTP Configuration
const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
};

export async function sendWelcomeEmail(email: string, name: string) {
    const isSmtpConfigured = !!(smtpConfig.user && smtpConfig.pass);
    const isResendConfigured = !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder';

    if (!isSmtpConfigured && !isResendConfigured) {
        console.warn('[EMAIL_SERVICE] No email provider configured (SMTP or Resend). Skipping email.');
        return;
    }

    const subject = 'Welcome to EdIntel EdIntel | Your Master Access Initiated 🚀';
    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
            <h1 style="color: #10b981; text-transform: uppercase; letter-spacing: 2px;">Welcome to the Command Deck</h1>
            <p>Dear ${name},</p>
            <p>Welcome to the future of educational leadership. Your Master Access to <strong>EdIntel EdIntel (2027)</strong> has been successfully provisioned.</p>
            
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h2 style="font-size: 16px; margin-top: 0;">Your EdIntel Journey Begins Now:</h2>
                <ul style="padding-left: 20px;">
                    <li style="margin-bottom: 10px;"><strong>14-Day Full Access Trial:</strong> You have 14 days of unrestricted access to the complete EdIntel Intelligence suite.</li>
                    <li style="margin-bottom: 10px;"><strong>The Token System:</strong> Your account has been credited with your initial strategic tokens. These power your interactions with the EdIntel Mentor and the Neuro-Resilience Briefing engine.</li>
                    <li><strong>Command Deck:</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://edintel-prod-ready.vercel.app'}/dashboard" style="color: #10b981; font-weight: bold;">Access your dashboard here</a> to begin your first briefing.</li>
                </ul>
            </div>

            <p style="background: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; color: #92400e; font-size: 14px;">
                <strong>⚠️ Strategic Note:</strong> You are currently in a <strong>14-day institutional trial</strong>. To ensure zero interruption to your service, please authorize token procurement before the trial expires.
            </p>

            <p><strong>Pro-Tip:</strong> As an early adopter, you have access to the <strong>Zero-Gravity Mode</strong>—unlocked via the toggle on your dashboard for a fluid, low-latency strategic experience.</p>
            
            <p>Should you require any assistance, our strategic support team is available at <a href="mailto:admin@edintel.app">admin@edintel.app</a>.</p>
            
            <p style="margin-top: 40px; border-top: 1px solid #eee; pt-20px; font-size: 12px; color: #666;">
                Welcome aboard,<br/>
                <strong>The EdIntel Identity Team</strong><br/>
                <em>Strategic Leadership Node: Alabama/Mobile County</em>
            </p>
        </div>
    `;

    try {
        if (isSmtpConfigured) {
            console.log(`[EMAIL_SERVICE] Using Custom SMTP (${smtpConfig.host})`);
            const transporter = nodemailer.createTransport({
                host: smtpConfig.host,
                port: smtpConfig.port,
                secure: smtpConfig.port === 465,
                auth: {
                    user: smtpConfig.user,
                    pass: smtpConfig.pass,
                },
            });

            await transporter.sendMail({
                from: `"EdIntel Support" <${smtpConfig.user}>`,
                to: email,
                subject,
                html: htmlContent,
            });
        } else {
            console.log(`[EMAIL_SERVICE] Using Resend Relay`);
            await resend.emails.send({
                from: 'EdIntel Identity <welcome@edintel.app>',
                to: [email],
                subject,
                html: htmlContent,
            });
        }
        console.log(`[EMAIL_SERVICE] Welcome briefing dispatched to ${email}`);
    } catch (error) {
        console.error('[EMAIL_SERVICE] Neural relay failure:', error);
    }
}
