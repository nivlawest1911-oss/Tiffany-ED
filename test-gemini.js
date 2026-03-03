require('dotenv').config();
const { generateText } = require('ai');
const { google } = require('@ai-sdk/google');

async function run() {
    try {
        const res = await generateText({
            model: google('gemini-2.5-flash'),
            prompt: 'Reply with simply "OK" if you receive this.',
        });
        console.log("SUCCESS:", res.text);
    } catch (e) {
        console.error("FAIL:", e);
    }
}
run();
