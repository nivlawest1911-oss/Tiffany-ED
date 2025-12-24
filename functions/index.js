const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// YOUR API KEY
const apiKey = process.env.GOOGLE_GENAI_API_KEY;
exports.generateIEP = onRequest({ cors: true, invoker: "public" }, async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.prompt || "Hello");
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ text: "API Key Error: " + error.message });
  }
});
