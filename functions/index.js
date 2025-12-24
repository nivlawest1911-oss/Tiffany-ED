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
    const { data: prompt, role, location, schoolType, category } = req.body;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Dr. West AI Twin. When 'Continuous Learning Center' or 'CLC' is mentioned: 1. Focus on the 'Whole Child' model including Behavioral Health, Credit Recovery, and Transition Safety. 2. Reference Alabama Code Section 16-1-44.1 (School Safety). 3. Propose specific 'Warm Handoff' strategies. 4. Use the DBA leadership lens to calculate cost-savings of reduced recidivism."
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    await db.collection('strategicAudits').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: prompt,
      strategicOutput: responseText,
      targetSchool: "Continuous Learning Center",
      location: "Mobile, AL",
      category: "Alternative Education"
    });

    res.json({ data: responseText });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
