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
      systemInstruction: "You are the EdIntel Global Strategic Engine. Your logic is rooted in Dr. West's leadership philosophy: equity-focused, data-driven, and compliant with Alabama and National standards. Tailor your response based on the User Role and Location provided. Be precise for Whistler/Prichard/Mobile but scalable for the 50 states."
    });

    const context = Role:  | Location:  | Type:  | Category: \nPrompt: ;
    const result = await model.generateContent(context);
    const responseText = result.response.text();

    const auditRecord = {
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: prompt,
      strategicOutput: responseText,
      role: role || "Stakeholder",
      location: location || "Alabama",
      schoolType: schoolType || "Public",
      category: category || "General",
      status: "COMPLETED"
    };
    
    await db.collection('strategicAudits').add(auditRecord);
    res.json({ data: responseText });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
