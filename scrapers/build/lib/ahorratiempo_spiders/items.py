
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
