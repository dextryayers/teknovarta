const { execSync } = require('child_process');
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.log("No API Key found in .env");
  process.exit(1);
}

console.log("Testing API Key with raw fetch...");
try {
  const response = execSync(`curl https://generativelanguage.googleapis.com/v1beta/models?key=${key}`).toString();
  console.log("Response:", response);
} catch (e) {
  console.error("Error:", e.message);
}
