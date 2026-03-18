const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements for light mode colors
content = content.replace(/bg-slate-50\b/g, 'bg-[#FAF5F0]');
content = content.replace(/bg-white\b/g, 'bg-white'); // Keep white cards
content = content.replace(/text-slate-900\b/g, 'text-[#4A3F35]');
content = content.replace(/text-slate-800\b/g, 'text-[#4A3F35]');
content = content.replace(/text-slate-600\b/g, 'text-[#6B5B4D]');
content = content.replace(/text-slate-500\b/g, 'text-[#8C7A6B]');
content = content.replace(/text-slate-400\b/g, 'text-[#A89F91]');
content = content.replace(/border-slate-100\b/g, 'border-[#F0E5E1]');
content = content.replace(/border-slate-200\b/g, 'border-[#E8DCC4]');
content = content.replace(/hover:bg-slate-100\b/g, 'hover:bg-[#F0E5E1]');
content = content.replace(/hover:text-slate-600\b/g, 'hover:text-[#6B5B4D]');

// Accents
content = content.replace(/text-teal-700\b/g, 'text-[#4A3F35]'); // Main title
content = content.replace(/text-teal-600\b/g, 'text-[#D9A0A5]'); // Pink accent
content = content.replace(/bg-teal-50\b/g, 'bg-[#FDF8F5]'); // Light pink bg

// Other tab active colors (make them all pink/warm for consistency with the theme)
content = content.replace(/text-orange-500\b/g, 'text-[#D9A0A5]');
content = content.replace(/bg-orange-50\b/g, 'bg-[#FDF8F5]');
content = content.replace(/text-indigo-500\b/g, 'text-[#D9A0A5]');
content = content.replace(/bg-indigo-50\b/g, 'bg-[#FDF8F5]');
content = content.replace(/text-emerald-500\b/g, 'text-[#D9A0A5]');
content = content.replace(/bg-emerald-50\b/g, 'bg-[#FDF8F5]');
content = content.replace(/text-rose-500\b/g, 'text-[#D9A0A5]');
content = content.replace(/bg-rose-50\b/g, 'bg-[#FDF8F5]');

// Specific status badges
content = content.replace(/text-emerald-600\b/g, 'text-[#7A907A]');
content = content.replace(/bg-emerald-50\b/g, 'bg-[#F0F4F0]');
content = content.replace(/text-amber-600\b/g, 'text-[#C5A059]');
content = content.replace(/bg-amber-50\b/g, 'bg-[#FDFBF5]');

// Map icon colors
content = content.replace(/bg-slate-300\b/g, 'bg-[#D1C4B5]');
content = content.replace(/bg-yellow-300\b/g, 'bg-[#E8DCC4]');
content = content.replace(/bg-blue-300\b/g, 'bg-[#C4D1E8]');
content = content.replace(/bg-orange-300\b/g, 'bg-[#E8C4B5]');
content = content.replace(/bg-emerald-300\b/g, 'bg-[#C4E8D1]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replacements complete.');
