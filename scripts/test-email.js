const nodemailer = require('nodemailer');
// Load .env.local if it exists
require('dotenv').config({ path: '.env.local' });

async function main() {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        console.error("Error: SMTP_USER and SMTP_PASS must be set in your environment or .env.local");
        console.log("Example .env.local content:");
        console.log("SMTP_USER=dr.alvinwest@gmail.com");
        console.log("SMTP_PASS=your16digitpassword");
        return;
    }

    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: port === 465, // true for 465, false for 587
        auth: {
            user: user,
            pass: pass,
        },
    });

    try {
        console.log(`Attempting to send test email via ${host}:${port}...`);
        let info = await transporter.sendMail({
            from: `"EdIntel Test" <${user}>`,
            to: user, // Send it to yourself
            subject: "SMTP Connection Test - EdIntel Sovereign",
            text: "If you are reading this, your SMTP configuration (including the 16-digit Google App Password) is working correctly!",
            html: "<b>If you are reading this, your SMTP configuration (including the 16-digit Google App Password) is working correctly!</b>",
        });

        console.log("Message sent: %s", info.messageId);
        console.log("🚀 Success! Your SMTP is configured correctly.");
    } catch (error) {
        console.error("❌ Error occurred:", error.message);
        if (error.message.includes('EAUTH')) {
            console.log("Suggestion: Verify your App Password. Remember to remove any spaces.");
        } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ESOCKET')) {
            console.log("Suggestion: Port 465 might be blocked. Try Port 587 with secure: false.");
        }
    }
}

main();
