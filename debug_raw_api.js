const axios = require('axios');
require('dotenv').config();

async function debugGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Testing with Key:", apiKey);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: "Hi" }] }]
    });
    console.log("SUCCESS:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.log("ERROR STATUS:", error.response.status);
      console.log("ERROR DATA:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.log("ERROR:", error.message);
    }
  }
}

debugGemini();
