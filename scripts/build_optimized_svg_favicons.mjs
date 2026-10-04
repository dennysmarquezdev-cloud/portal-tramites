import fs from 'fs';
import path from 'path';

const pngPath = path.resolve('d:/proyecto_abril/portal-tramites/public/logo-ahorratiempo.png');
const pngBuffer = fs.readFileSync(pngPath);
const pngBase64 = pngBuffer.toString('base64');

const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="512" height="512">
  <image width="512" height="512" xlink:href="data:image/png;base64,${pngBase64}" />
</svg>
`;

fs.writeFileSync(path.resolve('d:/proyecto_abril/portal-tramites/public/favicon.svg'), cleanSvg, 'utf8');
console.log('Generated lightweight, crisp public/favicon.svg (bytes:', cleanSvg.length, ')');
