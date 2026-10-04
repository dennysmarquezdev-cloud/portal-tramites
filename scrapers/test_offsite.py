import scrapy
from scrapy.spidermiddlewares.offsite import OffsiteMiddleware
from scrapy.http import Request

class S(scrapy.Spider):
    name='s'
    allowed_domains=['gob.pe']

s = S()
m = OffsiteMiddleware.from_crawler(scrapy.crawler.Crawler(S))
m.spider_opened(s)
print("Is allowed?", m.should_follow(Request('https://www.gob.pe'), s))
