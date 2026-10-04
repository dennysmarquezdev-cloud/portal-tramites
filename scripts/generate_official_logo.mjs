import fs from 'fs';
import path from 'path';

const srcImgPath = 'C:/Users/gabri/.gemini/antigravity/brain/032a852e-a2f9-4245-a611-7aaf7c858937/.user_uploaded/media_1791051559739.jpg';
const buffer = fs.readFileSync(srcImgPath);
const base64 = buffer.toString('base64');

const targetFiles = [
  'public/logo-ahorratiempo.png',
  'public/logo-ahorratiempo.jpeg',
  'public/favicon.png',
  'public/favicon.ico',
  'public/favicon-512x512.png',
  'public/favicon-192x192.png',
  'public/favicon-96x96.png',
  'public/favicon-48x48.png',
  'public/favicon-32x32.png',
  'public/favicon-16x16.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/apple-touch-icon.png',
  'public/brand-icon.png',
  'public/brand-icon-192.png',
  'public/brand-icon-96.png',
  'public/assets/lota-ai-logo.png',
  'public/loading-logo.png',
  'public/logo-icon-brand.png'
];

for (const relPath of targetFiles) {
  const fullPath = path.resolve('d:/proyecto_abril/portal-tramites', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, buffer);
  console.log(`Updated ${relPath} (${buffer.length} bytes)`);
}

// Clean and crisp SVG without complex broken filters
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="512" height="512">
  <image width="512" height="512" href="data:image/jpeg;base64,${base64}" xlink:href="data:image/jpeg;base64,${base64}" />
</svg>
`;

fs.writeFileSync(path.resolve('d:/proyecto_abril/portal-tramites/public/favicon.svg'), svgContent, 'utf8');
console.log('Updated public/favicon.svg');

fs.writeFileSync(path.resolve('d:/proyecto_abril/portal-tramites/public/logo-ahorratiempo.svg'), svgContent, 'utf8');
console.log('Updated public/logo-ahorratiempo.svg');

if (fs.existsSync('d:/proyecto_abril/portal-tramites/public/login-resources')) {
  fs.writeFileSync(path.resolve('d:/proyecto_abril/portal-tramites/public/login-resources/logo-ahorratiempo.svg'), svgContent, 'utf8');
}
if (fs.existsSync('d:/proyecto_abril/portal-tramites/public/login-resources/login-resources')) {
  fs.writeFileSync(path.resolve('d:/proyecto_abril/portal-tramites/public/login-resources/login-resources/logo-ahorratiempo.svg'), svgContent, 'utf8');
}
