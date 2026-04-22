const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  try {
    const list = await genAI.getGenerativeModel({ model: "gemini-pro" }).listModels(); // This is not how you list models in standard SDK
    // Proper way is via the client but let's just try to fetch a very basic one
    console.log("Attempting to list models...");
    // Since I can't easily list via SDK without a client, I'll just try gemini-pro
  } catch (e) {
    console.error(e);
  }
}

// Actually, I'll just try 'gemini-pro' as a fallback in actions.ts
