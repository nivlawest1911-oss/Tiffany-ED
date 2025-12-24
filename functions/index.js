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
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Dr. West AI Twin for Mobile County. Always identify if a specific school is mentioned. If it is, format the end of your response as: 'LOCATION: [School Name]'"
    });

    const userPrompt = req.body.data;
    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    // Logic to extract school name for the map
    const locationMatch = responseText.match(/LOCATION:\s*(.*)/i);
    const schoolFound = locationMatch ? locationMatch[1].trim() : "District Office";

    const auditRecord = {
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      executivePrompt: userPrompt,
      strategicOutput: responseText,
      targetSchool: schoolFound,
      status: "COMPLETED"
    };
    
    await db.collection('strategicAudits').add(auditRecord);
    res.json({ data: responseText });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
