import fs from 'fs';
import path from 'path';

const svgPath = 'D:/logo-ahorratiempo/logo-ahorratiempo.svg';
const svgContent = fs.readFileSync(svgPath, 'utf8');

const match = svgContent.match(/xlink:href=["']data:image\/png;base64,([^"']+)["']/);

if (match) {
  const base64Data = match[1];
  const buffer = Buffer.from(base64Data, 'base64');
  
  const targets = [
    'public/logo-ahorratiempo.png',
    'public/brand-icon.png',
    'public/brand-icon-192.png',
    'public/favicon.png',
    'public/favicon-512x512.png',
    'public/favicon-192x192.png',
    'public/favicon-96x96.png',
    'public/favicon-48x48.png',
    'public/favicon-32x32.png',
    'public/favicon-16x16.png',
    'public/icon-192.png',
    'public/icon-512.png',
    'public/apple-touch-icon.png',
    'public/assets/lota-ai-logo.png'
  ];

  for (const target of targets) {
    const fullPath = path.resolve('d:/proyecto_abril/portal-tramites', target);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, buffer);
    console.log(`Generated: ${target} (${buffer.length} bytes)`);
  }

  // Also write favicon.ico from the PNG buffer
  fs.writeFileSync(path.resolve('d:/proyecto_abril/portal-tramites', 'public/favicon.ico'), buffer);
  console.log('Generated: public/favicon.ico');
} else {
  console.error('Could not find base64 image in SVG');
}
