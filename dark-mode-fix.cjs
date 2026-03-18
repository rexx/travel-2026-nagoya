const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Dark mode background and surface colors (Warm Espresso / Deep Taupe)
content = content.replace(/dark:bg-slate-950\b/g, 'dark:bg-[#2A2421]');
content = content.replace(/dark:bg-slate-900\/95\b/g, 'dark:bg-[#362F2B]/95');
content = content.replace(/dark:bg-slate-900\b/g, 'dark:bg-[#362F2B]');
content = content.replace(/dark:bg-slate-800\/50\b/g, 'dark:bg-[#4A3F35]/50');
content = content.replace(/dark:bg-slate-800\b/g, 'dark:bg-[#4A3F35]');
content = content.replace(/dark:bg-slate-600\b/g, 'dark:bg-[#6B5B4D]');

// Dark mode borders
content = content.replace(/dark:border-slate-800\b/g, 'dark:border-[#4A3F35]');
content = content.replace(/dark:border-slate-700\/50\b/g, 'dark:border-[#5C4D42]/50');
content = content.replace(/dark:border-slate-700\b/g, 'dark:border-[#5C4D42]');

// Dark mode text colors (Warm Off-Whites and Taupes)
content = content.replace(/dark:text-slate-100\b/g, 'dark:text-[#FDF8F5]');
content = content.replace(/dark:text-slate-200\b/g, 'dark:text-[#E8DCC4]');
content = content.replace(/dark:text-slate-300\b/g, 'dark:text-[#D1C4B5]');
content = content.replace(/dark:text-slate-400\b/g, 'dark:text-[#A89F91]');
content = content.replace(/dark:text-slate-500\b/g, 'dark:text-[#8C7A6B]');
content = content.replace(/dark:text-slate-800\b/g, 'dark:text-[#4A3F35]');

// Dark mode hover states
content = content.replace(/dark:hover:bg-slate-800\b/g, 'dark:hover:bg-[#4A3F35]');
content = content.replace(/dark:hover:text-slate-300\b/g, 'dark:hover:text-[#D1C4B5]');

// Dark mode shadows
content = content.replace(/dark:shadow-slate-800\/50\b/g, 'dark:shadow-[#2A2421]/50');

// Dark mode accents (Lighter Dusty Rose for contrast)
content = content.replace(/dark:text-teal-400\b/g, 'dark:text-[#E6B8BC]');
content = content.replace(/dark:bg-teal-900\/30\b/g, 'dark:bg-[#D9A0A5]/20');

// Unify other tab colors to the dusty rose theme in dark mode
content = content.replace(/dark:text-orange-400\b/g, 'dark:text-[#E6B8BC]');
content = content.replace(/dark:bg-orange-900\/30\b/g, 'dark:bg-[#D9A0A5]/20');
content = content.replace(/dark:text-indigo-400\b/g, 'dark:text-[#E6B8BC]');
content = content.replace(/dark:bg-indigo-900\/30\b/g, 'dark:bg-[#D9A0A5]/20');
content = content.replace(/dark:text-rose-400\b/g, 'dark:text-[#E6B8BC]');
content = content.replace(/dark:bg-rose-900\/30\b/g, 'dark:bg-[#D9A0A5]/20');

// Status badges in dark mode (Muted Sage Green and Muted Gold)
content = content.replace(/dark:text-emerald-400\b/g, 'dark:text-[#9EBA9E]');
content = content.replace(/dark:bg-emerald-900\/30\b/g, 'dark:bg-[#7A907A]/20');
content = content.replace(/dark:text-amber-400\b/g, 'dark:text-[#E0C082]');
content = content.replace(/dark:bg-amber-900\/30\b/g, 'dark:bg-[#C5A059]/20');
content = content.replace(/dark:bg-amber-500\b/g, 'dark:bg-[#C5A059]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Dark mode replacements complete.');
