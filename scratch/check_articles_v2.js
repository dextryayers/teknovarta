const fs = require('fs');
const content = fs.readFileSync('lib/articles.ts', 'utf8');
const startMatch = content.match(/export const ARTICLES: Article\[\] = \[/);
const startIndex = startMatch.index + startMatch[0].length;
const arrayContent = content.substring(startIndex, content.lastIndexOf('];'));

const items = arrayContent.split(/},\s*{/);
items.forEach((item, index) => {
    const idMatch = item.match(/"id":\s*(\d+)/);
    const id = idMatch ? idMatch[1] : 'unknown';
    
    if (item.includes('</p>",')) {
        const parts = item.split('</p>",');
        if (parts.length > 2) {
             console.log(`Duplication detected in item ${index} (ID: ${id})`);
             // Print the part after </p>",
             const firstPart = parts[0].substring(parts[0].length - 20);
             const secondPart = parts[1].substring(0, 20);
             console.log(`Context: ...${firstPart}</p>",${secondPart}...`);
        }
    }
});
