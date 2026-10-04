import scrapy
from ahorratiempo_spiders.items import TramiteItem
from datetime import datetime
import re
import hashlib
import json

class InstitucionSpider(scrapy.Spider):
    name = "institucion_spider"
    allowed_domains = ["gob.pe", "www.gob.pe"]
    
    # URLs con paginación explícita (1 a 17)
    start_urls = [f"https://www.gob.pe/institucion/sunat/tramites-y-servicios?sheet={i}" for i in range(1, 18)]

    def parse(self, response):
        """
        Extrae todos los enlaces a trámites desde la página institucional.
        """
        links = response.css('a::attr(href)').getall()
        
        tramite_links = set()
        for link in links:
            if "/noticias/" in link or "/normas-legales/" in link or "/informes-publicaciones/" in link:
                continue
            if re.search(r'/\d+-', link):
                tramite_links.add(link)
                
        self.logger.info(f"Encontrados {len(tramite_links)} trámites en {response.url}")
        
        for link in tramite_links:
            url = response.urljoin(link)
            yield scrapy.Request(
                url=url,
                callback=self.parse_ficha
            )

    def parse_ficha(self, response):
        """
        Extrae los datos desde la ficha del trámite.
        """
        item = TramiteItem()
        item['url_fuente'] = response.url
        item['scraped_at'] = datetime.now().isoformat()
        item['id'] = "gob_" + hashlib.md5(response.url.encode('utf-8')).hexdigest()[:10]
        
        # Extracción básica
        item['name'] = response.css('h1::text').get(default='').strip()
        item['entity'] = response.css('.institution-name::text').get(default='SUNAT').strip()
        
        # Extraer todo el contenido textual (Llama 70B lo procesará perfecto)
        selectors = ['article', '.page-body', '.content-body', 'main']
        raw_text_parts = []
        for selector in selectors:
            texts = response.css(f'{selector} *::text').getall()
            if texts:
                raw_text_parts.extend(texts)
                break
                
        clean_text = ' '.join([t.strip() for t in raw_text_parts if t.strip()])
        item['raw_content'] = clean_text
        
        # Canal / Link de acción externa (El botón azul de "Ir al servicio" o "Hazlo online")
        action_url = response.css('a[data-ga-element-type="boton-azul"]::attr(href)').get()
        if not action_url:
            action_url = response.css('.btn--pages-button::attr(href)').get()
        if not action_url:
            action_url = response.css('.button-content-page a::attr(href)').get()
            
        item['action_url'] = action_url
        
        # Opcional: Extraer costo si es fácil de ubicar
        costo_match = re.search(r'costo[:\s]+(S/\s*\d+|\d+\s*soles|gratuito|gratis)', clean_text, re.IGNORECASE)
        item['costo'] = costo_match.group(1) if costo_match else ""
        
        yield item
