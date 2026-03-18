const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('Noto+Serif+TC')) {
  cssContent = `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700;900&display=swap');\n` + cssContent;
  
  if (!cssContent.includes('@theme')) {
    cssContent += `\n@theme {\n  --font-serif: "Noto Serif TC", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;\n}\n`;
  }
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Updated index.css');
}

const appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Add font-serif to h1, h2, h3
appContent = appContent.replace(/<h1 className=\{`([^`]+)`\}/g, (match, p1) => {
  if (p1.includes('font-serif')) return match;
  return `<h1 className={\`${p1} font-serif\`}`;
});

appContent = appContent.replace(/<h2 className="([^"]+)"/g, (match, p1) => {
  if (p1.includes('font-serif')) return match;
  return `<h2 className="${p1} font-serif"`;
});

appContent = appContent.replace(/<h3 className="([^"]+)"/g, (match, p1) => {
  if (p1.includes('font-serif')) return match;
  return `<h3 className="${p1} font-serif"`;
});

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('Updated App.tsx');
