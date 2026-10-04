import scrapy
from scrapy import signals
import json
import re
import hashlib
import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from ahorratiempo_spiders.items import TramiteItem

class GobSpider(scrapy.Spider):
    name = "gob_spider"
    allowed_domains = ["gob.pe", "www.gob.pe", "vuce.gob.pe", "mtc.gob.pe", "sunarp.gob.pe", "migraciones.gob.pe", "produce.gob.pe"]
    
    start_urls = ["https://www.gob.pe/catalogos/34-tramitesyservicios"]
    
    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(GobSpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_opened, signal=signals.spider_opened)
        return spider

    def spider_opened(self, spider):
        self.existing_ids = set()
        creds_json_str = self.settings.get("FIREBASE_CREDS_JSON") or os.environ.get("FIREBASE_CREDS_JSON")
        if not firebase_admin._apps:
            if creds_json_str:
                creds_dict = json.loads(creds_json_str)
                cred = credentials.Certificate(creds_dict)
                firebase_admin.initialize_app(cred)
            elif os.path.exists("firebase_credentials.json"):
                cred = credentials.Certificate("firebase_credentials.json")
                firebase_admin.initialize_app(cred)
            else:
                self.logger.warning("No se encontraron credenciales. No se saltarán trámites.")
                return
        try:
            db = firestore.client()
            docs = db.collection("tramites_descubiertos").select([]).stream()
            for doc in docs:
                self.existing_ids.add(doc.id)
            self.logger.info(f"Retomando scraping: Se encontraron {len(self.existing_ids)} trámites ya extraídos.")
        except Exception as e:
            self.logger.error(f"Error precargando IDs de Firestore: {e}")

    def start_requests(self):
        # 1. Ejecutar el escaneo principal normal
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse)
            
        # 2. Inyectar explícitamente los Top 20 trámites más consultados
        top_20 = [
            {"title": "Emitir recibo por honorarios electrónico", "url": "https://ww1.sunat.gob.pe/ol-ti-itrheopciones/RHESunat.htm", "cat": "emprender"},
            {"title": "Consultar estado de tu trámite para la entrega de tu DNI", "url": "https://serviciosportal.reniec.gob.pe/cetdnipi/inicio.htm", "cat": "identificacion-ciudadana"},
            {"title": "Verificar si estás afiliado al SIS", "url": "https://cel.sis.gob.pe/SisConsultaEnLinea", "cat": "salud"},
            {"title": "Consultar los datos de un vehículo - Consulta Vehicular", "url": "https://consultavehicular.sunarp.gob.pe/", "cat": "conducir"},
            {"title": "Obtener tu Certificado Único Laboral (CUL)", "url": "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/", "cat": "trabajo"},
            {"title": "Consultar el estado del RUC", "url": "https://e-consultaruc.sunat.gob.pe/", "cat": "emprender"},
            {"title": "Emitir factura electrónica - Sistema de Emisión Electrónica", "url": "https://ww1.sunat.gob.pe/ol-ti-itfesimpopciones/FESimpSunat.htm", "cat": "emprender"},
            {"title": "Imprimir constancia de inscripción en el RNP", "url": "https://www.rnp.gob.pe/constancia/rnp_constancia/validacertificadotodos.asp", "cat": "emprender"},
            {"title": "Antecedentes Penales", "url": "https://cape.pj.gob.pe/cape/", "cat": "denunciar-o-reclamar"},
            {"title": "Solicitar copia certificada de acta o partida en Reniec", "url": "https://apps.reniec.gob.pe/actascertificadas", "cat": "identificacion-ciudadana"},
            {"title": "Acceder a la oficina virtual de Sedapal Aquanet", "url": "https://www.gob.pe/institucion/sedapal/tramites-y-servicios", "cat": "informacion-de-entidades"},
            {"title": "Obtener ficha RUC electrónica", "url": "https://orientacion.sunat.gob.pe/sites/default/files/inline-files/ficha_ruc_0.pdf", "cat": "emprender"},
            {"title": "Consultar si tu seguro EsSalud está activo", "url": "https://dondemeatiendo.essalud.gob.pe/", "cat": "salud"},
            {"title": "Conocer cuántas líneas celulares tienes a tu nombre - Checa", "url": "https://checatuslineas.osiptel.gob.pe/", "cat": "informacion-de-entidades"},
            {"title": "Buscar procedimientos de selección de entidades públicas", "url": "https://prodapp2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml", "cat": "informacion-de-entidades"},
            {"title": "Solicitar la suspensión de retenciones de cuarta categoría", "url": "https://www.sunat.gob.pe/accesosDirectos/suspensionCuarta.html", "cat": "emprender"},
            {"title": "Obtener Certificado de Antecedentes Policiales para uso nacional", "url": "https://www.gob.pe/324-certificado-de-antecedentes-policiales-para-viaje-o-uso-en-el-extranjero", "cat": "identificacion-ciudadana"},
            {"title": "Obtener pasaporte electrónico para mayores de edad", "url": "https://www.gob.pe/208-obtener-pasaporte-electronico-para-menores-de-edad", "cat": "viajar-a-otro-pais"},
            {"title": "Solicitar Certificado de Inscripción (C4)", "url": "https://apps.reniec.gob.pe/certins", "cat": "identificacion-ciudadana"},
            {"title": "Solicitar duplicado de DNI azul, DNIe y DNI de menor", "url": "https://identidad.reniec.gob.pe/preguntas-frecuentes-dni", "cat": "identificacion-ciudadana"}
        ]
        
        for item_data in top_20:
            item = TramiteItem()
            item['name'] = item_data['title']
            item['theme'] = item_data['cat']
            item['subtheme'] = "Trámites Destacados"
            item['entity'] = "Gobierno del Perú"
            item['url'] = item_data['url']
            item['action_url'] = item_data['url']
            item['scraped_at'] = datetime.now().isoformat()
            item['id'] = "gob_top_" + hashlib.md5(item_data['url'].encode('utf-8')).hexdigest()[:10]
            
            # Muchos de los Top 20 son sitios externos o apps, los mandamos a parse_external para capturar su body tag
            # a excepción de los que son gob.pe puros
            if "gob.pe" in item_data['url'] and "institucion" not in item_data['url'] and "-" in item_data['url'].split("/")[-1]:
                callback_fn = self.parse_tramite_profundo
            else:
                callback_fn = self.parse_external

            yield scrapy.Request(
                url=item_data['url'],
                callback=callback_fn,
                meta={'item': item},
                errback=self.handle_external_error,
                dont_filter=True
            )

    def parse(self, response):
        """
        Nivel 1: Catálogo Principal.
        Extrae los enlaces a las páginas de cada Tema (ej. Conducir, Educación).
        """
        theme_links = response.css('a.card-index::attr(href)').getall()
        for link in theme_links:
            yield response.follow(link, callback=self.parse_theme)

    def parse_theme(self, response):
        """
        Nivel 2: Página del Tema.
        Extrae los Subtemas y los Trámites listados.
        """
        theme_name = response.css('h1::text').get(default="Desconocido").strip()
        
        # Iterar por cada Subtema (ej. "Licencias de conducir")
        for subtheme_node in response.css('.child'):
            subtheme_name = subtheme_node.css('.child-title h3::text').get(default="General").strip()
            
            # Iterar por cada Trámite dentro del Subtema
            for proc_node in subtheme_node.css('.card-page'):
                a_tag = proc_node.css('.card-title a')
                name = a_tag.css('::text').get(default="").strip()
                url = a_tag.attrib.get('href', '')
                
                # Extraer botón de acción externa si existe
                action_url = proc_node.css('.card-button a::attr(href)').get()
                
                if not url:
                    continue
                
                # Normalizar URL
                if url.startswith('/'):
                    final_url = f"https://www.gob.pe{url}"
                else:
                    final_url = url
                
                item = TramiteItem()
                item['name'] = name
                item['theme'] = theme_name
                item['subtheme'] = subtheme_name
                item['entity'] = theme_name  # Frontend lo usa temporalmente como entidad
                item['url'] = final_url
                item['action_url'] = action_url
                item['scraped_at'] = datetime.now().isoformat()
                
                # Generar ID único
                item['id'] = "gob_" + hashlib.md5(final_url.encode('utf-8')).hexdigest()[:10]
                
                # Ir al Crawl Profundo de gob.pe
                yield scrapy.Request(
                    url=final_url,
                    callback=self.parse_tramite_profundo,
                    meta={'item': item}
                )

    def parse_tramite_profundo(self, response):
        """
        Nivel 3: Página interna de gob.pe del trámite.
        Extrae todo el texto del artículo.
        """
        item = response.meta['item']
        
        selectors = ['article', '.page-body', '.content-body', '.institution-document', 'main']
        raw_text_parts = []
        for selector in selectors:
            texts = response.css(f'{selector} *::text').getall()
            if texts:
                raw_text_parts.extend(texts)
                break
                
        clean_text = ' '.join([t.strip() for t in raw_text_parts if t.strip()])
        item['raw_content'] = clean_text
            
        action_url = item.get('action_url')
        if action_url and action_url.startswith('http'):
            # El botón externo apunta a un PDF u otra página de gob.pe, o un servicio
            # Agregamos la segunda cabeza (Crawl Externo)
            yield scrapy.Request(
                url=action_url,
                callback=self.parse_external,
                meta={'item': item},
                errback=self.handle_external_error,
                dont_filter=True
            )
        else:
            yield item

    def parse_external(self, response):
        """
        Nivel 4: Página externa del servicio.
        Extrae texto de portales ajenos a gob.pe y lo añade al contexto masivo.
        """
        item = response.meta['item']
        
        # Como es una página externa genérica, sacamos texto del body
        if hasattr(response, 'css'):
            texts = response.css('body *::text').getall()
            external_text = ' '.join([t.strip() for t in texts if t.strip()])
            if external_text:
                item['raw_content'] += "\n\n[INFO EXTERNA ADICIONAL]:\n" + external_text
                
        yield item

    def handle_external_error(self, failure):
        """
        Si la página externa falla (ej. timeout), guardamos el item igual.
        """
        self.logger.warning(f"Error visitando URL externa: {failure.request.url}")
        item = failure.request.meta['item']
        yield item
