import requests
import time
import os

offset = 0
limit = 50
filename = "vectors.jsonl"

if os.path.exists(filename):
    os.remove(filename)

print("Starting extraction of embeddings to vectors.jsonl...")
with open(filename, "a", encoding="utf-8") as f:
    while True:
        print(f"Fetching embeddings offset {offset}...")
        try:
            res = requests.get(f"http://127.0.0.1:8787/api/admin/embed?offset={offset}&limit={limit}")
            if res.status_code == 204:
                print("No more data. Done.")
                break
            
            if res.status_code != 200:
                print(f"Error: HTTP {res.status_code} - {res.text}")
                break
                
            jsonl_data = res.text
            if not jsonl_data.strip():
                print("Empty response. Done.")
                break
                
            f.write(jsonl_data)
            offset += limit
            time.sleep(1)
        except Exception as e:
            print(f"Error: {e}")
            break
