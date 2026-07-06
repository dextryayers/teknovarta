const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Try specifying API version v1
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });

async function generateSummary(title, content) {
  try {
    const prompt = `Ringkas artikel teknologi berikut dalam satu kalimat yang padat (maksimal 25 kata), menarik, dan informatif untuk ditampilkan sebagai 'AI Insight'. Gunakan bahasa Indonesia yang santai tapi profesional. Fokus pada poin paling penting atau 'wow factor' dari produk/berita tersebut.
    
    Judul: ${title}
    Konten: ${content.substring(0, 2000)}...`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error(`Error generating summary for ${title}:`, error.message);
    return null;
  }
}

async function processArticles() {
  const filePath = path.join(__dirname, "../lib/articles.ts");
  let content = fs.readFileSync(filePath, "utf8");

  const articleBlocks = content.split(/  \{\r?\n    "id":|  \{\r?\n    id:/);
  const header = articleBlocks[0];
  const items = articleBlocks.slice(1);

  console.log(`Found ${items.length} articles.`);

  let updatedCount = 0;
  let newItems = [];
  let limit = 5; 

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    const idMatch = item.match(/^\s*(\d+)/);
    const id = idMatch ? idMatch[1] : i;
    
    if (!item.includes('"aiSummary":') && !item.includes('aiSummary:') && updatedCount < limit) {
      console.log(`Processing article ID ${id}...`);
      
      const titleMatch = item.match(/"title":\s*"([^"]+)"|title:\s*"([^"]+)"/);
      const contentMatch = item.match(/"content":\s*"([^"]+)"|content:\s*"([^"]+)"/);
      
      const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : "";
      const articleContent = contentMatch ? (contentMatch[1] || contentMatch[2]) : "";

      if (title && articleContent) {
        const summary = await generateSummary(title, articleContent);
        if (summary) {
          const insertionPoint = item.indexOf('"content":') !== -1 ? item.indexOf('"content":') : item.indexOf('content:');
          item = item.substring(0, insertionPoint) + `    "aiSummary": "${summary}",\n` + item.substring(insertionPoint);
          updatedCount++;
          console.log(`Summary: ${summary}`);
        }
      }
    }
    newItems.push(`  {\n    "id":` + item);
  }

  const finalContent = header + newItems.join("");
  fs.writeFileSync(filePath, finalContent, "utf8");
  console.log(`Done! Updated ${updatedCount} articles.`);
}

processArticles();
