const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix dark mode classes that were accidentally replaced
content = content.replace(/dark:text-\[\#4A3F35\]/g, 'dark:text-slate-800'); // Or 900, but 800 is safer
content = content.replace(/dark:text-\[\#6B5B4D\]/g, 'dark:text-slate-600');
content = content.replace(/dark:text-\[\#8C7A6B\]/g, 'dark:text-slate-500');
content = content.replace(/dark:text-\[\#A89F91\]/g, 'dark:text-slate-400');
content = content.replace(/dark:hover:text-\[\#6B5B4D\]/g, 'dark:hover:text-slate-600');
content = content.replace(/dark:bg-\[\#FAF5F0\]/g, 'dark:bg-slate-50');
content = content.replace(/dark:border-\[\#F0E5E1\]/g, 'dark:border-slate-100');
content = content.replace(/dark:border-\[\#E8DCC4\]/g, 'dark:border-slate-200');
content = content.replace(/dark:hover:bg-\[\#F0E5E1\]/g, 'dark:hover:bg-slate-100');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixes complete.');
