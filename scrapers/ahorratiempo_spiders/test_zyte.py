import requests
import os

API_KEY = "195b7b4a9d141101ab01e523fbb09ec1"  # From logs
proxy_url = f"http://{API_KEY}:@proxy.zyte.com:8011"
proxies = {
    "http": proxy_url,
    "https": proxy_url,
}

url = "https://www.gob.pe/busquedas?contenido%5B%5D=servicios&institucion%5B%5D=sunat"
print("Fetching with Zyte...")
try:
    response = requests.get(url, proxies=proxies, verify=False, timeout=60)
    with open("zyte_response.html", "w", encoding="utf-8") as f:
        f.write(response.text)
    print(f"Status: {response.status_code}")
    print("Saved to zyte_response.html")
except Exception as e:
    print(e)
