
import scrapy

class TramiteItem(scrapy.Item):
    id = scrapy.Field()
    name = scrapy.Field()
    entity = scrapy.Field()
    theme = scrapy.Field()
    subtheme = scrapy.Field()
    url = scrapy.Field()
    action_url = scrapy.Field()
    scraped_at = scrapy.Field()
    raw_content = scrapy.Field()
    
    # Nuevos campos atómicos institucionales
    requisitos = scrapy.Field()
    costo = scrapy.Field()
    plazo = scrapy.Field()
    canal = scrapy.Field()
    base_legal = scrapy.Field()
    url_fuente = scrapy.Field()
