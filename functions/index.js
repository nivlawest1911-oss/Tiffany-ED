const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");

// Initialize Firebase Admin to save Audit History
admin.initializeApp();
const db = admin.firestore();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

exports.generateIEP = onRequest({ 
  cors: true, 
  secrets: ["GOOGLE_GENAI_API_KEY"] 
}, async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      // 1. LEADERSHIP PERSONA: Embedding your specific voice and philosophy
      systemInstruction: "You are the Dr. West AI Twin, a high-level Educational Executive for Mobile County. Your voice is professional, data-driven, and focused on equity, compliance, and administrative efficiency. Use district-specific terminology like 'Strategic Realignment' and 'Alabama standards' in every audit."
    });

    const userPrompt = req.body.data || "General strategic overview requested.";
    
    // 2. DISTRICT SPECIFICITY: Pre-contextualizing the prompt for Mobile County
    const strategicContext = "Mobile County District Context: " + userPrompt;

    const result = await model.generateContent(strategicContext);
    const responseText = result.response.text();

    // 3. AUDIT HISTORY: Saving this audit to Firestore permanently
    const auditRecord = {
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: userPrompt,
      strategicOutput: responseText,
      version: "Project Alpha v1.0",
      status: "COMPLETED"
    };
    
    await db.collection('strategicAudits').add(auditRecord);

    res.json({ data: responseText });

  } catch (error) {
    console.error("Critical Suite Error:", error);
    res.status(500).send({ error: error.message });
  }
});
