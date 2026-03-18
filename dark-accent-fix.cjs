const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace pink accents with yellow/gold accents in dark mode
content = content.replace(/dark:text-\[\#E6B8BC\]/g, 'dark:text-[#E2C07C]');
content = content.replace(/dark:bg-\[\#D9A0A5\]\/20/g, 'dark:bg-[#E2C07C]/20');

// Fix the promo section gradient and border in dark mode to match the new yellow theme
content = content.replace(/dark:from-rose-950\/30/g, 'dark:from-[#E2C07C]/10');
content = content.replace(/dark:to-orange-950\/30/g, 'dark:to-[#C5A059]/10');
content = content.replace(/dark:border-rose-900\/50/g, 'dark:border-[#E2C07C]/20');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Dark mode accent updated to yellow.');
