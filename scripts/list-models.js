require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
    console.log('Fetching available models...');

    try {
        // There isn't a direct "listModels" on the client instance in some versions,
        // but looking at the SDK docs/source, it's often on the class or manager.
        // Ideally we just try a model or use the model manager if exposed.
        // In 0.24.0 it might be via the API directly if the SDK doesn't expose it easily.
        // Actually, newer SDKs usually don't have a listModels helper directly on the client object easily accessible in node.
        // Let's try the simplest fallback: just print the key first (partial) to ensure it's loaded.
        console.log('Key loaded:', process.env.GOOGLE_GENAI_API_KEY ? 'Yes' : 'No');

        // We will attempt to run a generation with candidates to see if we can brute force "gemini-pro"
        // or just try a standard "gemini-1.5-flash" again but inspect the error more closely or try a raw fetch.

        // Let's try a raw fetch to the models endpoint to list them.
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log('Available Models:');
            data.models.filter(m => m.name.includes('gemini')).forEach(m => {
                console.log(`- ${m.name}`);
            });
        } else {
            console.log('Error listing models:', data);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
