import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Iniciando captura de Playwright...');

  const outDir = path.join(__dirname, '..', 'video-publicitario', 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const videoPath = outDir;

  const browser = await chromium.launch({
    headless: false, // para poder grabar correctamente las animaciones
    args: ['--hide-scrollbars']
  });

  const context = await browser.newContext({
    viewport: { width: 414, height: 896 }, // iPhone XR / 11 format
    deviceScaleFactor: 2,
    recordVideo: {
      dir: videoPath,
      size: { width: 414, height: 896 }
    }
  });

  const page = await context.newPage();
  
  // Vamos al portal local (que tiene el login removido)
  const targetUrl = 'http://localhost:5173';
  console.log(`Navegando a ${targetUrl}...`);
  
  try {
    await page.goto(targetUrl, { waitUntil: 'load' });
  } catch (e) {
    console.log("Error de conexión:", e);
  }

  // Esperar a que la página cargue completamente (0-2s)
  await page.waitForTimeout(2000);

  // "¿Cansado de trámites lentos? Conoce Ahorratiempo..." (Click en Saltar)
  try {
    const saltarBtn = page.getByText('Saltar', { exact: false });
    if (await saltarBtn.isVisible({ timeout: 2000 })) {
      await saltarBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}

  // Mostrar el inicio (3s - 7s)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(2000);

  // "¡Pregúntale a Frutilota IA, tu nueva asistente virtual..." (7s - 14s)
  try {
    // En versión móvil, el sidebar está oculto. Hay que abrir el menú hamburguesa.
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.className.includes('md:hidden'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(1500);

    const frutilotaNav = page.locator('.main-content').locator('..').getByText('Frutilota IA').last();
    if (true) {
      await frutilotaNav.click({ force: true });
      await page.waitForTimeout(2000);
      
      // Intentar escribir algo genérico en el chat
      const chatInput = page.getByPlaceholder(/Escribe/i).first();
      if (await chatInput.isVisible()) {
        await chatInput.click();
        await page.keyboard.type('Hola Frutilota, ¿qué puedes hacer?', { delay: 60 });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3500);
      }
    }
  } catch (e) {
    console.log("No se encontró Frutilota IA. Continuando...");
  }

  // "...y encuentra cientos de trámites del estado peruano a un solo toque!" (14s - 20s)
  try {
      // Abrir menú de nuevo si estamos en móvil
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.className.includes('md:hidden'));
        if (btn) btn.click();
      });
      await page.waitForTimeout(1500);

      const inicioNav = page.locator('.main-content').locator('..').getByText('Inicio').last();
      if (true) {
        await inicioNav.click({ force: true });
        await page.waitForTimeout(2000);
      }
  } catch (e) {}

  // Mostrar algunos trámites rápido con scroll
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(2000);

  // "¡Tu tiempo es tuyo! Visítanos ya en Ahorratiempo punto pe." (20s - 30s)
  await page.mouse.wheel(0, -900);
  
  // ASEGURAR que el video dure al menos 30 segundos (450+ frames en remotion).
  // Hasta aquí llevamos unos 20-22 segundos de esperas y animaciones. 
  // Agregamos 12 segundos más de grabación estática o movimiento sutil al final.
  await page.waitForTimeout(12000);

  console.log('Captura finalizada. Cerrando navegador...');
  await context.close();
  await browser.close();

  const files = fs.readdirSync(videoPath);
  const webmFile = files.find(f => f.endsWith('.webm') && !f.startsWith('capture'));
  if (webmFile) {
    fs.renameSync(path.join(videoPath, webmFile), path.join(videoPath, 'capture_v2.webm'));
    console.log(`Video guardado en ${path.join(videoPath, 'capture_v2.webm')}`);
  }
}

run().catch(console.error);
