import scrapy
from bs4 import BeautifulSoup
import re
import json

class SunatSpider(scrapy.Spider):
    name = "sunat_spider"
    allowed_domains = ["gob.pe", "www.gob.pe"]
    
    start_urls = [
        "https://www.gob.pe/busquedas?contenido%5B%5D=servicios&institucion%5B%5D=sunat"
    ]

    custom_settings = {
        'ROBOTSTXT_OBEY': False,
        'DOWNLOAD_DELAY': 1,
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }

    def parse(self, response):
        try:
            # Buscar el bloque window.initialData (ahora sin punto y coma final)
            match = re.search(r'window\.initialData\s*=\s*(\{.*?\})(?:</script>|;)', response.text, re.DOTALL)
            
            if not match:
                self.logger.error("No se encontró initialData en la página")
                return
                
            data = json.loads(match.group(1))
            
            # Extraer links de esta página
            if 'data' in data and 'attributes' in data['data'] and 'results' in data['data']['attributes']:
                results = data['data']['attributes']['results']
                for item in results:
                    url_raw = item.get('url')
                    if url_raw:
                        # Sometimes url is an HTML anchor tag
                        if '<a' in url_raw:
                            href_match = re.search(r'href=[\'"]?([^\'" >]+)', url_raw)
                            if href_match:
                                url = href_match.group(1)
                            else:
                                continue
                        else:
                            url = url_raw
                            
                        full_url = f"https://www.gob.pe{url}" if url.startswith('/') else url
                        yield scrapy.Request(full_url, callback=self.parse_tramite)

            # Paginación
            if 'data' in data and 'attributes' in data['data'] and 'total_count' in data['data']['attributes']:
                total_count = data['data']['attributes']['total_count']
                total_pages = (total_count + 24) // 25
                
                # Obtener la página actual de la URL
                import urllib.parse
                parsed_url = urllib.parse.urlparse(response.url)
                query_params = urllib.parse.parse_qs(parsed_url.query)
                current_page = int(query_params.get('sheet', ['1'])[0])
                
                if current_page < total_pages:
                    next_page = current_page + 1
                    base_url = response.url.split('&sheet=')[0]
                    next_url = f"{base_url}&sheet={next_page}"
                    yield scrapy.Request(next_url, callback=self.parse)
                    
        except Exception as e:
            self.logger.error(f"Error parsing initialData: {e}")

    def parse_tramite(self, response):
        url = response.url
        soup = BeautifulSoup(response.text, 'html.parser')
        
        title = soup.find('h1', class_='page__title')
        title_text = title.get_text(strip=True) if title else 'Sin título'
        
        markdown = f"# Entidad: SUNAT\n## Trámite: {title_text}\n**URL Oficial:** {url}\n\n"
        
        desc_elements = soup.select('.page__content > p')
        for p in desc_elements:
            text = p.get_text(strip=True)
            if text:
                markdown += f"{text}\n\n"
                
        req_section = soup.find('h2', string=re.compile('Requisitos', re.I))
        if req_section:
            markdown += f"### {req_section.get_text(strip=True)}\n"
            ul = req_section.find_next_sibling('div', class_='page__box-text')
            if ul:
                for item in ul.find_all('li'):
                    markdown += f"- {item.get_text(strip=True)}\n"
            markdown += "\n"
            
        modalities = soup.select('.modality-title-no-js h2 .title')
        for mod in modalities:
            mod_title = mod.get_text(strip=True)
            markdown += f"### {mod_title}\n"
            
            mod_container = mod.find_parent('div', class_='modality-title-no-js').find_next_sibling('div', class_='page__content')
            if mod_container:
                for child in mod_container.children:
                    if child.name in ['h2', 'h6']:
                        markdown += f"**{child.get_text(strip=True)}**\n"
                    elif child.name == 'p':
                        text = child.get_text(strip=True)
                        if text:
                            markdown += f"{text}\n\n"
                    elif child.name == 'ul':
                        for item in child.find_all('li'):
                            markdown += f"- {item.get_text(strip=True)}\n"
                markdown += "\n"
        
        yield {
            'entidad': 'SUNAT',
            'titulo': title_text,
            'url': url,
            'raw_content': markdown
        }
