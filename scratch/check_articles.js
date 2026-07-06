const fs = require('fs');
const content = fs.readFileSync('lib/articles.ts', 'utf8');

// Try to find the array start
const startMatch = content.match(/export const ARTICLES: Article\[\] = \[/);
if (!startMatch) {
    console.error('Could not find ARTICLES array');
    process.exit(1);
}

const startIndex = startMatch.index + startMatch[0].length;
const arrayContent = content.substring(startIndex, content.lastIndexOf('];'));

// This is a very rough check
try {
    // We can't easily parse it because it's TS, not JSON
    // but we can look for "content": "...", ...
    const items = arrayContent.split(/},\s*{/);
    console.log(`Found roughly ${items.length} items`);
    
    items.forEach((item, index) => {
        const quoteCount = (item.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
            console.log(`Potential issue in item ${index}: Odd number of quotes`);
            // Print a bit of context
            console.log(item.substring(0, 100));
        }
        
        if (item.includes('</p>",')) {
            const parts = item.split('</p>",');
            if (parts.length > 2) {
                 console.log(`Duplication detected in item ${index}`);
            }
        }
    });
} catch (e) {
    console.error(e);
}
