import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config(); // Fallback to .env
import { GoogleGenerativeAI } from "@google/generative-ai";

async function validateSecrets() {
    console.log("\n🚀 [SOVEREIGN_SENTINEL] Initiating Secret Validation Protocol...\n");

    // 1. Gemini AI Validation
    const geminiKey = (process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "").trim();
    if (geminiKey) {
        console.log("✅ Gemini API Key: Detected (" + geminiKey.substring(0, 4) + "..." + geminiKey.substring(geminiKey.length - 4) + ")");
        try {
            const genAI = new GoogleGenerativeAI(geminiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            await model.generateContent("ping");
            console.log("   🟢 Connectivity: Verified");
        } catch (error: any) {
            console.error("   🔴 Connectivity: FAILED - " + error.message);
        }
    } else {
        console.error("❌ Gemini API Key: MISSING (Set GOOGLE_GENERATIVE_AI_API_KEY)");
    }

    // 2. Google Cloud TTS Validation
    const credentialsJson = process.env.GOOGLE_CREDENTIALS_JSON;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (credentialsJson) {
        try {
            JSON.parse(credentialsJson);
            console.log("✅ Google Credentials JSON: Valid format");
        } catch (error) {
            console.error("❌ Google Credentials JSON: INVALID JSON format");
        }
    } else if (clientEmail && privateKey) {
        console.log("✅ Individual Google Credentials: Detected");
        if (!privateKey.includes("BEGIN PRIVATE KEY")) {
            console.error("   🔴 Private Key: Warning - Missing BEGIN/END headers");
        }
    } else {
        console.warn("⚠️ Google Cloud Credentials: Partial or missing (Needed for TTS)");
    }

    // 3. Better Auth Validation
    const authSecret = process.env.BETTER_AUTH_SECRET;
    const authUrl = process.env.BETTER_AUTH_URL;

    if (authSecret) {
        console.log("✅ Better Auth Secret: Detected");
    } else {
        console.error("❌ Better Auth Secret: MISSING");
    }

    if (authUrl) {
        console.log("✅ Better Auth URL: Detected (" + authUrl + ")");
    } else {
        console.warn("⚠️ Better Auth URL: MISSING (Required for production redirects)");
    }

    console.log("\n🏁 Validation Complete.\n");
}

validateSecrets();
