require('dotenv').config();

async function run() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    console.log("Key length:", key ? key.length : 0);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }]
        })
    });

    console.log("Status:", response.status);
    console.log("Body:", await response.text());
}
run();
