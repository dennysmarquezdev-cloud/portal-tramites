import * as cheerio from 'cheerio';

async function inspect(url) {
  console.log('\n========================================================');
  console.log('URL:', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('H1:', $('h1').first().text().trim());

  // Check main content container
  console.log('\n--- HEADINGS AND CONTENT SIBLINGS ---');
  $('h2, h3').each((i, el) => {
    const heading = $(el).text().trim();
    console.log(`\n[${i}] <${el.tagName}>: "${heading}"`);

    // Walk next siblings until next heading
    let curr = $(el).next();
    while (curr.length && !curr.is('h2, h3')) {
      const tag = curr.prop('tagName');
      const text = curr.text().replace(/\s+/g, ' ').trim();
      if (tag === 'UL' || tag === 'OL') {
        curr.find('li').each((j, li) => {
          console.log(`   li[${j}]: ${$(li).text().replace(/\s+/g, ' ').trim()}`);
        });
      } else if (text) {
        console.log(`   <${tag}>: ${text.slice(0, 150)}`);
      }
      curr = curr.next();
    }
  });

  // Check if there are specific sections or steps
  console.log('\n--- STEPS / PROCEDIMIENTO CONTAINER ---');
  $('.step, .steps, [id*="paso"], [class*="paso"]').each((i, el) => {
    console.log(`Step elem [${i}]:`, $(el).text().replace(/\s+/g, ' ').trim().slice(0, 150));
  });
}

async function run() {
  await inspect('https://www.gob.pe/1101-emitir-recibo-por-honorarios-electronico');
  await inspect('https://www.gob.pe/565-consultar-ruc');
  await inspect('https://www.gob.pe/8017-solicitar-la-suspension-de-retenciones-de-cuarta-categoria-formulario-n-1609');
}

run();
