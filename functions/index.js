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
    const { data: prompt, age, location } = req.body;
    
    // NEW COMPLIANCE LOGIC: Alabama SB 101 (2025)
    const requiresConsent = (location.includes("AL") && age < 16) || (age < 14);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Dr. West AI Twin. If student age is < 16 in Alabama, you MUST start the response with a 'CONSENT ALERT'. Reference Alabama SB 101 requirements for parental opt-in for all ongoing school-based mental health services. For CLC audits, ensure the 'Warm Handoff' includes a verification of the Digital Opt-In Form."
    });

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    if (requiresConsent) {
      responseText = "?? COMPLIANCE ALERT: Under Alabama SB 101 (Oct 2025), students under 16 require active parental opt-in. Ensure form 'CLC-2026-MHA' is signed before proceeding.\n\n" + responseText;
    }

    await db.collection('strategicAudits').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: prompt,
      requiresConsent,
      status: "VERIFIED"
    });

    res.json({ data: responseText });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
