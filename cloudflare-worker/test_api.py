import requests
import json
import base64

try:
    url = "http://127.0.0.1:8787/api/ai/chat"
    payload = {
        "messages": [
            {"role": "user", "content": "quiero saber si mi negocio sigue activo"}
        ],
        "selectedEntity": "SUNAT"
    }
    res = requests.post(url, json=payload, stream=True)
    
    print("Status:", res.status_code)
    debug_header = res.headers.get("X-Frutilota-Debug")
    if debug_header:
        debug_json = json.loads(base64.b64decode(debug_header).decode('utf-8'))
        print("DEBUG HEADER:", json.dumps(debug_json, indent=2))
    else:
        print("NO DEBUG HEADER")
        
    for line in res.iter_lines():
        if line:
            print(line.decode('utf-8'))
            break
except Exception as e:
    print("Error:", e)
