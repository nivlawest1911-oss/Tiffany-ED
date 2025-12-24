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
      systemInstruction: "You are the EdIntel Global Strategic Engine, the digital twin of Dr. West. Instructions: 1. Use a data-driven, executive voice focused on compliance and mental wellness. 2. Incorporate Alabama Act 2024-123 (Mental Health Coordinator mandates) and Alabama Principal Leadership Development System (APLDS) standards. 3. For the Continuous Learning Center (CLC), prioritize behavioral re-entry logic and 'RAMS way' values. 4. Scale logic for " + role + " at " + schoolType + " in " + location + ". 5. Format end of response as: LOCATION: [Name]."
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
