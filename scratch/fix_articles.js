const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'articles.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const fixedLines = lines.map(line => {
  // Matches "key": "value" patterns
  const match = line.match(/^(\s*)"(.*?)"\s*:\s*"(.*)"\s*(,?)\s*$/);
  if (match) {
    const indent = match[1];
    const key = match[2];
    const value = match[3];
    const comma = match[4];

    // Escape unescaped double quotes in the value
    // This regex looks for double quotes that are NOT preceded by a backslash
    const escapedValue = value.replace(/(?<!\\)"/g, '\\"');
    
    return `${indent}"${key}": "${escapedValue}"${comma}`;
  }
  return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'));
console.log('Fixed lib/articles.ts');
