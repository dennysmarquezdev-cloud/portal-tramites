BOT_NAME = "ahorratiempo_spiders"

SPIDER_MODULES = ["ahorratiempo_spiders.spiders"]
NEWSPIDER_MODULE = "ahorratiempo_spiders.spiders"

# Spoof real browser to avoid HTTP 418 (Bot blocking)
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Desactivar la obediencia al robots.txt porque el WAF lo usa como trampa
ROBOTSTXT_OBEY = False

# Configure item pipelines
ITEM_PIPELINES = {
    "ahorratiempo_spiders.pipelines.FirestorePipeline": 300,
}

# ==============================================================================
# ZYTE SMART PROXY MANAGER (CRAWLERA) CONFIGURATION
# ==============================================================================
DOWNLOADER_MIDDLEWARES = {
    'scrapy_zyte_smartproxy.ZyteSmartProxyMiddleware': 610,
}

# Habilitar el uso de Smart Proxy y establecer el API KEY (insertar el real en el panel de Zyte o aquí)
ZYTE_SMARTPROXY_ENABLED = True
ZYTE_SMARTPROXY_APIKEY = 'a3c7535af5054fe5a2327c3c4ed3f420'

# ==============================================================================
# AUTOTHROTTLE Y RATE LIMITING ÉTICO
# ==============================================================================
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 2.0
AUTOTHROTTLE_MAX_DELAY = 10.0
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
AUTOTHROTTLE_DEBUG = False

# ==============================================================================
# POLÍTICA DE RETRIES Y MANEJO DE WAF
# ==============================================================================
RETRY_ENABLED = True
RETRY_TIMES = 5 
# 418 es el bloqueo nativo del WAF de gob.pe, 429 es too many requests
RETRY_HTTP_CODES = [418, 429, 500, 502, 503, 504, 522, 524, 408]

# Set settings whose default value is deprecated to a future-proof value
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
