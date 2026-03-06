require('dotenv').config();
async function run() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    console.log(JSON.stringify(await res.json(), null, 2));
}
run();
