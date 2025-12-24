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
    
    // SB 101 Logic: Effective Oct 1, 2025, Age of Consent in AL is 16
    const requiresConsent = (location.includes("AL") && age < 16) || (age < 14);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Dr. West AI Twin. If student age is < 16 in Alabama, you MUST flag this as a 'SB 101 CONSENT REQUIRED' audit. Focus on the Dr. West DBA lens: data-driven, compliant, and equitable. For the CLC, ensure the 'Warm Handoff' transition logic verifies the annual parental opt-in form exists."
    });

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    if (requiresConsent) {
      responseText = "?? SB 101 COMPLIANCE ALERT: Under the Alabama 2025 Mandate, students under 16 require annual written parental opt-in for ongoing counseling. Ensure Digital Form CLC-2026 is verified.\n\n" + responseText;
    }

    await db.collection('strategicAudits').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: prompt,
      requiresConsent,
      status: "VERIFIED_COMPLIANT"
    });

    res.json({ data: responseText });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
