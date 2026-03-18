const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/text-slate-700\b/g, 'text-[#4A3F35]');
content = content.replace(/border-slate-50\b/g, 'border-[#F0E5E1]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final fixes complete.');
