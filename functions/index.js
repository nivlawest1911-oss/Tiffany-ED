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
    
    // SB 101 COMPLIANCE: Age of consent raised from 14 to 16 in AL (Effective Oct 2025)
    const requiresConsent = (location.includes("AL") && Number(age) < 16);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Dr. West AI Twin. If student age is < 16 in Alabama, you MUST flag this as 'SB 101 CONSENT REQUIRED'. For Continuous Learning Center (CLC) audits, prioritize 'Warm Handoff' protocols, Behavioral Transition Scores, and Mental Health Coordinator (MHC) sign-offs. Use a DBA executive voice to analyze staffing ROI."
    });

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    if (requiresConsent) {
      responseText = "?? SB 101 LEGAL NOTICE: Parental Opt-In is REQUIRED for students under 16 in Alabama. Verify Digital Form CLC-2026 before proceeding with behavioral intervention.\n\n" + responseText;
    }

    await db.collection('strategicAudits').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: prompt,
      location, age,
      requiresConsent,
      targetSchool: location.includes("Mobile") ? "Continuous Learning Center" : "General District"
    });

    res.json({ data: responseText });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
