require('dotenv').config();
async function run() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    if (data.models) {
        data.models.forEach(m => console.log(m.name));
    } else {
        console.log("Error or no models:", data);
    }
}
run();
