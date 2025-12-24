const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

exports.generateIEP = onRequest({ 
  cors: true, 
  secrets: ["GOOGLE_GENAI_API_KEY"] 
}, async (req, res) => {
  try {
    const { data: prompt, role, location, schoolType, category, tier } = req.body;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the EdIntel Global Strategic Engine. Instructions: 1. Use Dr. West's data-driven, equitable leadership voice. 2. Address specifics for " + location + ". 3. Tailor depth based on tier: " + (tier || 'Free') + ". 4. If school mentioned, format: LOCATION: [Name]."
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    await db.collection('strategicAudits').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: prompt,
      strategicOutput: responseText,
      role, location, schoolType, category,
      tier: tier || 'Free'
    });

    res.json({ data: responseText });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
