const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
    console.error("No API key found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    // Manual fetch to list models
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!response.ok) {
            console.error("List failed:", response.status, response.statusText);
        } else {
            const data = await response.json();
            console.log("--- START MODELS ---");
            data.models.forEach(m => {
                if (m.name.includes('gemini')) console.log(m.name);
            });
            console.log("--- END MODELS ---");
        }
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

listModels();
