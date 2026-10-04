import gTTS from 'gtts';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = "¿Cansado de trámites lentos? Conoce Ahorratiempo, tu app cien por ciento gratuita. ¡Pregúntale a Frutilota I A, y encuentra más de 500 trámites a un solo toque! Visítanos ya en Ahorratiempo punto pe.";
const gtts = new gTTS(text, 'es');

const outDir = path.join(__dirname, '..', 'video-publicitario', 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, 'voiceover.mp3');

gtts.save(outFile, function (err, result) {
  if (err) {
    throw new Error(err);
  }
  console.log('¡Audio generado exitosamente en ' + outFile + '!');
});
