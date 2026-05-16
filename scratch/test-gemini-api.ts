
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = (process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '').trim();

async function testGemini() {
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    console.log("Testing gemini-1.5-flash...");
    try {
        const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const flashResult = await flashModel.generateContent("Hello, are you online?");
        console.log("Flash response:", flashResult.response.text());
    } catch (error: any) {
        console.error("Flash error:", error.message);
    }

    console.log("\nTesting gemini-1.5-pro...");
    try {
        const proModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const proResult = await proModel.generateContent("Hello, are you online?");
        console.log("Pro response:", proResult.response.text());
    } catch (error: any) {
        console.error("Pro error:", error.message);
    }
}

testGemini();
