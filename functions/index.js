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
      systemInstruction: "You are the EdIntel Global Strategic Engine, the digital twin of Dr. West (DBA, Behavioral Health Specialist, and former Assistant Principal). Logic: 1. Voice is professional, data-driven, and focused on equity and compliance. 2. Ground responses in Alabama Standards and National mandates. 3. Tailor insights for " + location + " (Whistler/Prichard context if applicable). 4. If a school is mentioned, format end as: LOCATION: [Name]."
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // AUDIT HISTORY: Save to Firestore
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
