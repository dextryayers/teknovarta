const fs = require('fs');
const content = fs.readFileSync('lib/articles.ts', 'utf8');

const categories = new Set();
const categoryMatches = content.match(/"category":\s*"(.*?)"/g);
if (categoryMatches) {
    categoryMatches.forEach(m => {
        const cat = m.match(/"category":\s*"(.*?)"/)[1];
        categories.add(cat);
    });
}

const articles = [];
const articleBlocks = content.split('{\n    "id":');
// Skip the first part before the first ID
for (let i = 1; i < articleBlocks.length; i++) {
    const block = articleBlocks[i];
    const idMatch = block.match(/^\s*(\d+)/);
    const titleMatch = block.match(/"title":\s*"(.*?)"/);
    const categoryMatch = block.match(/"category":\s*"(.*?)"/);
    
    if (idMatch && titleMatch && categoryMatch) {
        articles.push({
            id: parseInt(idMatch[1]),
            title: titleMatch[1],
            category: categoryMatch[1]
        });
    }
}

console.log('CATEGORIES:', Array.from(categories));
console.log('TOTAL_ARTICLES:', articles.length);
fs.writeFileSync('scratch/article_data.json', JSON.stringify({ categories: Array.from(categories), articles }, null, 2));
