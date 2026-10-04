import requests
import json
import time

API_URL = "https://ahorratiempo-scraper.ahorratiempo.workers.dev/api/admin/embed"
OUTPUT_FILE = "remote_vectors.jsonl"

limit = 50
offset = 0

print("Empezando a embeber desde produccion...")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    while True:
        print(f"Buscando offset {offset}...")
        try:
            res = requests.get(f"{API_URL}?limit={limit}&offset={offset}", timeout=30)
            if res.status_code == 204:
                print("Terminado.")
                break
            
            if res.status_code != 200:
                print(f"Error {res.status_code}: {res.text}")
                time.sleep(2)
                continue
                
            text = res.text.strip()
            if not text:
                break
                
            lines = text.split("\n")
            for line in lines:
                f.write(line + "\n")
                
            print(f"Procesadas {len(lines)} filas.")
            offset += limit
            
        except Exception as e:
            print(f"Excepcion: {e}")
            time.sleep(5)
            
print("Proceso completado.")
