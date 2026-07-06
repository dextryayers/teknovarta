const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function list() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // Some versions of the SDK have listModels
    const models = await genAI.listModels();
    console.log(models);
  } catch (e) {
    console.log("Error listing models:", e.message);
  }
}
list();
