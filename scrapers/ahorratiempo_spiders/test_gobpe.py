import requests
import json
import re

url = "https://www.gob.pe/busquedas?contenido%5B%5D=servicios&institucion%5B%5D=sunat"
html = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}).text

match = re.search(r'window\.initialData\s*=\s*(\{.*?\});\n', html)
if match:
    data = json.loads(match.group(1))
    print(f"Total results: {data['data']['search']['total_results']}")
    for item in data['data']['search']['results'][:5]:
        print(f"Title: {item['title']}, URL: {item['url']}")
else:
    print("No initialData found")
